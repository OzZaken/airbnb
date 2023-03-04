import { httpService } from './http.service'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const locService = {
    approvedLocService,
    getUserDistance,
    setUserLocBy: {
        CountryName: setUserLocByCountryName,
    },
    getLocBy: {
        address: getLocByAddress,
        city: getLocByCity,
        country: getLocationByCountry,
        countryCode: getLocByCode,
    },
}
// debug
window.gLocService = locService

const countries = require('../assets/data/countries.json')

const _UserMsg = withReactContent(Swal)

const STORAGE_KEY = 'userLoc'
const { API_KEY } = process.env

// My data analyst not sure which way better! 👱🏽‍♀️ 🤏🏽
const locs = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
const locsMap = JSON.parse(localStorage.getItem(STORAGE_KEY + 'Map')) || {}

// prevent unnecessary requests (already search same input and type )
const invalidSearchResult = JSON.parse(localStorage.getItem('invalidSearchResult')) || {}

// user Location State
var gUserPos = sessionStorage.getItem(STORAGE_KEY) || locs[locs.length - 1] || null

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
            _getCurrentUserPos()
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

//* //  ///   /////      Search     \\\\\    \\\  *\\
/* if NOT search today with same method & input */
function _isValidSearch(type, input) {
    const alreadySearch = invalidSearchResult[type][_formatDate(null, false, true)].include(input)
    if (alreadySearch) {
        _UserMsg.fire({
            icon: "warning",
            title: "Address not found",
            html: `We couldn't find your desired address ${input}
              <br>Last search at ${_formatDate(null, false)}
              <br>Try searching another way.`
        })
        return
    }
    return true
}

/* put new invalid search result */
function _handleSearchError(type, input) {
    invalidSearchResult[type][_formatDate(null, false, true)].push(input)
    _UserMsg.fire({
        icon: "info",
        title: "Address not found",
        html: `We couldn't find your desired address ${input}
          <br>Last search at ${_formatDate(null, false)}
          <br>Try searching another way.`
    })
}

/* address */
async function getLocByAddress(addressFromUser) {
    if (!_isValidSearch('address', addressFromUser)) return

    const regex = new RegExp(addressFromUser, "i")
    const country = countries.find(
        (c) =>
            c.name.match(regex) ||
            c.region.match(regex) ||
            c.subregion.match(regex) ||
            c.capital.match(regex)
    )
    if (country) {
        return {
            lat: country.latlng[0],
            lng: country.latlng[1],
        }
    } else {
        try {
            const result = await _searchLocByAddress(addressFromUser);
            return {
                lat: result.lat,
                lng: result.lng,
            }
        } catch (err) {
            _handleSearchError()
            throw new Error(`Error searching for location: ${addressFromUser}`);
        }
    }
}

async function _searchLocByAddress(locationName) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=${API_KEY}`;

    try {
        const response = await httpService.get(url);
        const result = response.data.results[0];
        const {
            formatted_address: name,
            geometry: { location: { lat, lng } },
        } = result;
        return { name, lat, lng };
    } catch (error) {
        console.error(`Error searching for location: ${locationName}`, error);
        throw new Error(`Error searching for location: ${locationName}`);
    }
}

/* country code */
async function getLocByCode(code) {
    const country = countries.find(
        (c) => c.alpha2Code === code || c.alpha3Code === code
    )
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
        const result = response.data.results[0]
        const { formatted_address: name, geometry: { location: { lat, lng } } } = result
        return { name, lat, lng }
    } catch (error) {
        console.error(`Error searching for location: ${code}`, error)
        throw new Error(`Error searching for location: ${code}`)
    }
}

/* name */
async function getLocByCity(cityName, countryName) {
    const country = countries.find(c => c.name.toLowerCase() === countryName.toLowerCase())
    if (!country) {
        throw new Error(`Country ${countryName} not found`)
    }
    const city = country.capital.toLowerCase() === cityName.toLowerCase()
        ? { name: country.capital, latlng: country.latlng }
        : country.cities.find(c => c.name.toLowerCase() === cityName.toLowerCase())
    if (city) {
        const { name, latlng } = city
        return { name, lat: latlng[0], lng: latlng[1] }
    } else {
        // Search for the city using Google Maps Geocoding API
        const locationName = `${cityName}, ${countryName}`
        try {
            return await _searchLocByName(locationName)
        } catch (error) {
            console.error(`Error searching for location: ${locationName}`, error)
            throw new Error(`Error searching for location: ${locationName}`)
        }
    }
}

async function _searchLocByName(name) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${API_KEY}`;

    try {
        const response = await httpService.get(url);
        const result = response.data.results[0];
        const {
            formatted_address: name,
            geometry: { location: { lat, lng } },
        } = result;
        return { name, lat, lng };
    } catch (error) {
        console.error(`Error searching for location: ${name}`, error);
        throw new Error(`Error searching for location: ${name}`);
    }
}


//* //  ///   /////      User Location    \\\\\    \\\  *\\
function getUserDistance(stayLocation) {
    console.log(`🚀 ~ stayLocation:`, stayLocation)
    var stayPos
    /* Handle Undefined pos from User */
    if (!gUserPos) _setUserPosByAlfaCode('IL')
    const { lat, lng } = gUserPos
    /* Handle Undefined lat lng from Stay */
    let { lat: stayLat, lng: stayLng, } = stayLocation
    if (!stayLat || !stayLng) {
        const { countryCode } = stayLocation
        const { lat, lng } = _getPosByCode(countryCode)
        stayPos = { lat, lng }
    }
    return _calcDistance(stayPos, { lat, lng })
}

function _setUserPosByAlfaCode(alfaCode) {
    const country = _getPos(_getCountryFromAlfaCode(alfaCode))
    _updateUserLoc(_getPos(country))
}

function setUserLocByCountryName(preferCountry = 'Israel') {
    const country = countries.find(country => country.name === preferCountry)
    _updateUserLoc(_getPos(country))
}

function _getCountryFromAlfaCode(code) {
    return countries.find((c) => c.alpha2Code === code || c.alpha3Code === code)
}

function _getCurrentUserPos() {
    if (!navigator.geolocation) {
        _showErrorMsg('HTML5 Geolocation is not supported in your browser')
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

function _updateUserLoc(pos, date = _formatDate()) {
    gUserPos = pos

    const loc = { date: pos }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(loc))

    // Data Types
    locs.push(loc)
    locsMap[date] = pos

    localStorage.setItem(STORAGE_KEY, JSON.stringify(locs))
    localStorage.setItem(STORAGE_KEY + 'Map', JSON.stringify(locsMap))

    // httpService.post(STORAGE_KEY, loc)
}

function _formatDate(date = new Date(), byHour = true, byDay = false) {
    if (byHour || byDay) {
        date.setMinutes(0)
        date.setSeconds(0)

    }
    if (byHour || byDay) {
        date.setDays(0)
    }

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZoneName: 'long'
    })
}

//* //  ///   /////      privet    \\\\\    \\\  *\\
/* Distance */
function _calcDistance(posA, posB) {
    const radius = _getEarthRadius() // Earth's radius in km or miles
    const dLat = (posB.lat - posA.lat) * Math.PI / 180
    const dLon = (posB.lng - posA.lng) * Math.PI / 180
    const lat1 = posA.lat * Math.PI / 180
    const lat2 = posB.lat * Math.PI / 180

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = radius * c

    return distance
}

// i18n
function _getEarthRadius() {
    const lang = navigator.language
    const kmLocales = ['en-US', 'en-GB', 'fr-FR', 'es-ES', 'it-IT', 'pt-PT', 'pt-BR']
    const milesLocales = ['en-CA', 'en-AU']

    if (kmLocales.includes(lang)) {
        return 6371 // Earth's radius in km
    } else if (milesLocales.includes(lang)) {
        return 3959 // Earth's radius in miles
    } else {
        console.warn('Unknown locale:', lang)
        return 6371 // default to km
    }
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







function getLocationByCountry(countryName) {
    const country = countries.find(c => c.name.toLowerCase() === countryName.toLowerCase())
    if (!country) {
        throw new Error(`Country ${countryName} not found`)
    }
    const { name, latlng } = country
    return { name, lat: latlng[0], lng: latlng[1] }
}

function _getPos(country) {
    return {
        lat: country.latlng[0],
        lng: country.latlng[1]
    }
}

