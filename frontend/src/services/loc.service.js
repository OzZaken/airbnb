import { httpService } from './http.service'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { utilService } from './util.service'
import _ from 'lodash'

const _UserMsg = withReactContent(Swal)
const COUNTRIES = require('../assets/data/countries.json')

const STORAGE_KEY = 'userLoc'
const API_KEY = process.env.API_KEY
console.log('API_KEY:', API_KEY)

/* Saving on 2 Data Types*/
const LOCS = JSON.parse(localStorage.getItem(STORAGE_KEY + 's')) || []
const LOCS_MAP = JSON.parse(localStorage.getItem(STORAGE_KEY + 'Map')) || {}

/* user Location State By Default in Israel */
var gUserPos = sessionStorage.getItem(STORAGE_KEY) // session
    || LOCS[LOCS.length - 1]// LOCS
    || _setUserLocByCountryCode('ISR') // Default in Israel 

console.log(`🚀 ~ gUserPos:`, gUserPos)
// prevent unnecessary requests (already search same input and type )
const INVALID_SEARCH_RESULT = JSON.parse(localStorage.getItem('invalidSearchResult')) || {}

export const locService = {
    getLocByAddress,
    getUserPos,
    getUserDistance,
    approvedLocService,
    setUserLocByCountryName,
}
// debug
window.gLocService = locService
window.gDebug = {
    LOCS,
    LOCS_MAP,
    INVALID_SEARCH_RESULT
}
async function approvedLocService() {
    const hasApprovedLocation = await _showConfirmMsg(
        'info',
        'Approve Location Service',
        'App uses Location Service to provide better user experience',
        'Yes, Approve Location Service!',
        true,
        'No!'
    )
    try {
        if (hasApprovedLocation.isConfirmed) {
            sessionStorage.setItem('hasApprovedLocation', true)
            _setUserPos()
            _showUserMsg(
                'success',
                'Location Service Approved!',
                'You can now enjoy better user experience!'
            )
        } else {
            _showUserMsg(
                'warning',
                'Location Service Not Approved!',
                'Some features of the app may not be available without location data'
            )
        }
    } catch (error) {
        console.error('Error setting user location:', error)
    }
}

//* //  ///   /////      Search Location   \\\\\    \\\  *\\
/* By name, region, subregion ,capital*/
async function getLocByAddress(address) {
    console.log(`🚀 ~ getLocByAddress(address):`, address)
    if (!_isValidSearch('address', address)) return
    // filter try find in local data 
    const regex = new RegExp(address, "i")
    const country = COUNTRIES.find(
        (c) =>
            c.name.match(regex) ||
            c.region.match(regex) ||
            c.subregion.match(regex) ||
            c.capital.match(regex)
    )
    // found on local data
    if (country) {
        return {
            lat: country.latlng[0],
            lng: country.latlng[1],
        }
    } else {
        try {
            // search using googleapis
            const result = await _searchLocByAddress(address)
            console.log(`🚀 ~ result:`, result)
            return {
                lat: result.lat,
                lng: result.lng,
            }
        } catch (err) {
            throw new Error(`Error searching for location: ${address}`)
        }
    }
}
async function _searchLocByAddress(address) {
    console.log('_searchLocByAddress(address)', address)
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`

    try {
        const response = await httpService.get(url)
        return _getLoc(response.data.results[0])
    } catch (err) {
        _handleSearchError('address', address)
        throw new Error(`Error searching for location: ${address}`)
    }
}

/* By country code alfa2 || alfa3 */
async function getLocByCountryCode(code) {
    const country = _getCountryFromAlfaCode(code)
    if (country) {
        return {
            lat: country.latlng[0],
            lng: country.latlng[1],
        }
    } else {
        try {
            const searchResult = await _searchLocByCode(code)
            return {
                lat: searchResult.lat,
                lng: searchResult.lng,
            }
        } catch (err) {
            throw new Error(`Error searching for location: ${code}`)
        }
    }
}
async function _searchLocByCode(code) {
    const codeType = code.length === 2 ? 'alfa2Code' : 'alfa3Code'
    const url = `https://maps.googleapis.com/maps/api/geocode/json?${codeType}=${code}&key=${API_KEY}`

    try {
        const response = await httpService.get(url)
        return _getLoc(response.data.results[0])
    } catch (error) {
        _handleSearchError('code', code)
        throw new Error(`Error searching for location: ${code}`)
    }
}
//* //  ///   /////      Search Validation    \\\\\    \\\  *\\
/* if NOT search today with same method & input */
function _isValidSearch(type, input) {
    const { formatDate } = utilService
    const alreadySearch =
        INVALID_SEARCH_RESULT[type][formatDate(new Date(), 'byDay')].include(input)
    if (alreadySearch) {
        _UserMsg.fire({
            icon: "info",
            title: "Address not found",
            html: `We couldn't find your desired address ${input}
              <br>Last search at ${formatDate()}
              <br>Try searching another way.`
        })
        return
    }
    return true
}
/* put new invalid search result */
function _handleSearchError(searchType, input) {
    const { formatDate } = utilService
    INVALID_SEARCH_RESULT[searchType][formatDate(new Date(), 'byDay')].push(input)
    _UserMsg.fire({
        icon: "info",
        title: "Address not found",
        html: `We couldn't find your desired address ${input}
          <br>Last search at ${formatDate(null, false)}
          <br>Try searching another way.`
    })
}

//* //  ///   /////      User Location    \\\\\    \\\  *\\
function getUserPos() {
    return gUserPos
}

function getUserDistance(stayLoc) {
    var stayPos
    /* Handle Undefined lat lng */
    var { lat, lng } = stayLoc
    if (!lat || !lng) {
        var { address, city, country, countryCode } = stayLoc
        if (countryCode) {
            stayPos = { ...getLocByCountryCode(countryCode) }
        } else if (address || city || country) {
            stayPos = { ...getLocByAddress(`${address || ' '}${city || ' '}${country || ''}`) }
        } else console.error('undefined Location', stayLoc)

    }
    return _calcDistance(stayPos, gUserPos)
}

/*  for starting with Demo Distance */
function _setUserLocByCountryCode(code) {
    const country = _getCountryFromAlfaCode(code)
    const pos = _getPosFromCountry(country)
    _updateUserLoc(pos)
}

/* optional for user who !navigator.geolocation */
function setUserLocByCountryName(preferCountry = 'Israel') {
    const country = COUNTRIES.find(country => country.name === preferCountry)
    _updateUserLoc(_getPosFromCountry(country))
}

function _setUserPos() {
    if (!navigator.geolocation) {
        _showErrorMsg('')
        return null
    }

    // Define a function to handle the successful retrieval of the user's location.
    const onSuccessSetUserLoc = (pos) => {
        // format date & pos  
        const { latitude: lat, longitude: lng } = pos.coords
        _updateUserLoc({ lat, lng })
    }

    // Define a function to handle errors when retrieving the user's location.
    const onErrorSetUserLoc = (err) => {
        console.log("Error getting user location:", err)
        switch (err.code) {
            case 0:
                _showErrorMsg("There was an error while retrieving your location: " + err.message)
                break
            case 1:
                _showErrorMsg("The user didn't allow this page to retrieve a location.")
                break
            case 2:
                _showErrorMsg("The browser was unable to determine your location: " + err.message)
                break
            case 3:
                _showErrorMsg("The browser timed out before retrieving the location.")
                break
            default:
                // todo: log to back
                _showErrorMsg("An unknown error occurred while retrieving your location. Please try again later or contact technical support if the problem persists.")
                break
        }
    }

    navigator.geolocation.getCurrentPosition(onSuccessSetUserLoc, onErrorSetUserLoc)
}

function _updateUserLoc(pos) {
    gUserPos = pos
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(gUserPos))

    const { formatDate } = utilService
    const date = formatDate(new Date(), 'byHour')
    const loc = { date: pos }

    // Data Types
    LOCS.push(pos)
    localStorage.setItem(STORAGE_KEY + 's', JSON.stringify(LOCS))
    
    LOCS_MAP[date] = pos
    localStorage.setItem(STORAGE_KEY + 'Map', JSON.stringify(LOCS_MAP))
    
    // const data = [
    //     { url: STORAGE_KEY + 's', data: pos },
    //     { url: STORAGE_KEY + 'Map', data: loc }
    // ]
    // httpService.post(STORAGE_KEY,data)
}

//* //  ///   /////      Privet    \\\\\    \\\  *\\
function _calcDistance(posA, posB) {
    const { getEarthRadius } = utilService
    const radius = getEarthRadius() // Earth's radius in km or miles

    const dLat = (posB.lat - posA.lat) * Math.PI / 180
    const dLon = (posB.lng - posA.lng) * Math.PI / 180

    const lat1 = posA.lat * Math.PI / 180
    const lat2 = posB.lat * Math.PI / 180

    // a = sin²(Δlat/2) + cos(lat1) * cos(lat2) * sin²(Δlon/2)
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) *
        Math.cos(lat1) * Math.cos(lat2)

    // c = 2 * atan2(√a, √(1-a))
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = radius * c

    return distance
}
/* find country by alpha2Code && alpha3Code */
function _getCountryFromAlfaCode(code) {
    return COUNTRIES.find(c => c.alpha2Code === code || c.alpha3Code === code)
}
/* extract Pos from country */
function _getPosFromCountry(country) {
    console.log(`🚀 ~ country:`, country)
    return {
        lat: country.latlng[0],
        lng: country.latlng[1]
    }
}
/* extract Loc from google Api searchResult */
function _getLoc(searchResult) {
    const {
        formatted_address: name,
        geometry: { location: { lat, lng } },
    } = searchResult

    return { name, lat, lng }
}

//* //  ///   /////      Swal _UserMsg    \\\\\    \\\  *\\
function _showErrorMsg(title, text) {
    _UserMsg.fire({
        icon: 'error',
        title: <p>{title}</p>,
        text: <p>{text}</p>,
    })
}
// success || warning
function _showUserMsg(type, title, text) {
    _UserMsg.fire({
        icon: type,
        title: <p>{title}</p>,
        text: <p>{text}</p>,
    })
}
// question || info
function _showConfirmMsg(type, title, text, confirmButtonText, showCancelButton, cancelButtonText) {
    _UserMsg.fire({
        icon: type,
        title: <p>{title}</p>,
        text: <p>{text}</p>,
        confirmButtonText: <p>{confirmButtonText}</p>,
        showCancelButton,
        cancelButtonText: <p>{cancelButtonText}</p>,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    })
}