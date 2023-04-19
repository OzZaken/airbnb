import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { httpService } from './http.service'
import utilService from './util.service'
import { saveToLocalStorage, loadFromLocalStorage, loadFromSessionStorage, saveToSessionStorage } from './browser-storage.service.js'
import transService from './i18n.service'
import { askUser, popUserMsg } from './user-msg.service'
const countries = require('../assets/data/countries.json') // const countries = countryService.getCountries()
const API_KEY = process.env.GOOGLE_API_KEY
const STORAGE_KEY = 'userLoc'
const userLocs = loadFromLocalStorage(STORAGE_KEY + 's') || []
const userLocsMap = loadFromLocalStorage(STORAGE_KEY + 'Map') || {}
const INVALID_SEARCH_RESULT = loadFromLocalStorage('invalidSearchResult') || {} /* prevent unnecessary requests. */
const { formatDate } = utilService

/* current location of the user */
var gUserPos = loadFromSessionStorage(STORAGE_KEY)
    || userLocs[userLocs.length - 1]
    || setUserLocByCountryCode('ISR') /* debug */
    || null/* ↑ after debug */


export const locService = {
    approvedLocService,
    getLocByAddress: getLocBy,
    getUserPos,
    getUserDistance,
    setUserLocByCountryName,
}

async function approvedLocService() {
    const msg = {
        // type: 'info',
        title: 'Approve Location Service',
        txt: 'App uses Location Service to provide better user experience',
        data: {
            confirmBtnTxt: 'Yes, Approve Location Service!',
            isConfirmBtnShown: true,
            cancelBtnTxt: 'No!'
        }
    }

    try {
        const hasApprovedLocation = await askUser(msg)
        if (hasApprovedLocation.isConfirmed) {
            sessionStorage.setItem('hasApprovedLocation', true)
            _setUserPos()
            popUserMsg({
                type: 'success',
                title: 'Location Service Approved!',
                txt: 'You can now enjoy better user experience!'
            })
        } else popUserMsg({
            type: 'warning',
            title: 'Location Service Not Approved!',
            txt: 'Some features of the app may not be available without location data'
        })

    } catch (error) {
        console.error('Error setting user location:', error)
    }
}

// ---------------------------------   search By name, region, subregion or capital    
async function getLocBy(txt) {
    if (!_isValidSearch('txt', txt)) return
    // filter try find in local data 
    const regex = new RegExp(txt, "i")
    const country = countries.find(c =>
        c.name.match(regex) ||
        c.region.match(regex) ||
        c.subregion.match(regex) ||
        c.capital.match(regex)
    )
    // found on local data (no need for ajax search)
    if (country) {
        return {
            lat: country.latlng[0],
            lng: country.latlng[1],
        }
    } else {
        try {
            // search using googleapis
            const result = await _searchLocByAddress(txt)
            return {
                lat: result.lat,
                lng: result.lng,
            }
        } catch (err) {
            throw new Error(`Error searching for location: ${txt}`)
        }
    }
}

async function _searchLocByAddress(address) {
    console.log('_searchLocByAddress(address)', address)
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`

    try {
        const response = await httpService.get(url)
        return _formatLoc(response.data.results[0])
    } catch (err) {
        _handleSearchError('address', address)
        throw new Error(`Error searching for location: ${address}`)
    }
}

// ---------------------------------   search By code     
async function getLocByCountryCode(code) {
    const country = _getCountryByCode(code)
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
        return _formatLoc(response.data.results[0])
    } catch (error) {
        _handleSearchError('code', code)
        throw new Error(`Error searching for location: ${code}`)
    }
}

// ---------------------------------   search validation     
/* if NOT search (today) with same method & input */
function _isValidSearch(type, input) {
    const alreadySearch =
        INVALID_SEARCH_RESULT[type][formatDate(new Date(), 'byDay')].include(input)
    if (alreadySearch) {
        UserMsg.fire({
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
    UserMsg.fire({
        icon: "info",
        title: "Address not found",
        html: `We couldn't find your desired address ${input}
          <br>Last search at ${formatDate(null, false)}
          <br>Try searching another way.`
    })
}

// ---------------------------------   User Location     
function getUserPos() {
    return gUserPos
}

function getUserDistance(loc) {
    var stayPos
    /* Handle Undefined lat lng */
    var { lat, lng } = loc
    if (!lat || !lng) {
        var { address, city, country, countryCode } = loc
        if (countryCode) stayPos = { ...getLocByCountryCode(countryCode) }

        else if (address || city || country) stayPos = {
            ...getLocBy(`${address || ''}${city || ''}${country || ''}`)
        }
        else console.log(`%c undefined Loc ${JSON.stringify(loc)}`, 'color: red;')
    }
    else return _calcDistance({ lat, lng }, gUserPos)
    return _calcDistance(stayPos, gUserPos)
}

/* init with Demo Distance */
function setUserLocByCountryCode(code) {
    const country = _getCountryByCode(code)
    const pos = _formatPos(country)
    _updateUserLoc(pos)
}

/* optional for user who !navigator.geolocation */
function setUserLocByCountryName(preferCountry = 'Israel') {
    const country = countries.find(country => country.name === preferCountry)
    _updateUserLoc(_formatPos(country))
}

// ---------------------------------   privates     
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
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(pos))

    const { formatDate } = utilService
    const date = formatDate(new Date(), 'byHour')

    // [] 
    const loc = { date: pos }
    userLocs.push(loc)
    localStorage.setItem(STORAGE_KEY + 's', JSON.stringify(userLocs))
    // {} 
    userLocsMap[date] = pos
    localStorage.setItem(STORAGE_KEY + 'Map', JSON.stringify(userLocsMap))

    // httpService.post(STORAGE_KEY,loc)
}

// ---------------------------------   find country by code     
function _getCountryByCode(code) {
    return countries.find(c => c.alpha2Code === code || c.alpha3Code === code)
}

/* uses destructuring to extract the necessary properties from google Api searchResult */
function _formatLoc({ formatted_address: name, geometry: { location: { lat, lng } } }) {
    return { name, lat, lng }
}

/* extract Pos from country */
function _formatPos(country) {
    return {
        lat: country.latlng[0],
        lng: country.latlng[1]
    }
}

function _calcDistance(posA, posB) {
    const radius = transService.getEarthRadius()

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

// ---------------------------------   user massage     
const UserMsg = withReactContent(Swal)

function _showErrorMsg(title, text) {
    UserMsg.fire({
        icon: 'error',
        title: <p>{title}</p>,
        text: <p>{text}</p>,
    })
}

// question or info
function _showConfirmMsg(type, title, text, confirmButtonText, showCancelButton, cancelButtonText) {
    UserMsg.fire({
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