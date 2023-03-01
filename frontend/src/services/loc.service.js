import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { showErrorMsg } from './event-bus.service'
import Swal from 'sweetalert2'

export const locService = {
    setUserLoc,
    getUserLoc,
    searchLocation,
    getCoordsFromCountyCode,
    getDistanceFromLatLng,
}
const STORAGE_KEY = 'userLocs'
const SESSION_KEY = 'userLoc'
const locsMap = _loadUserLocsFromStorage() || {}

const countries = require('../assets/data/countries.json')
function getCoordsFromCountyCode(alpha2Code) {
    const country = countries.find(country => country.alpha2Code === alpha2Code)
    const pos = {
        lat: country.latlng[0],
        lng: country.latlng[1]
    }
    return pos
}

function getUserLoc() {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY))
}

async function searchLocation(locationName) {
    const apiKey = 'YOUR_API_KEY'
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=${apiKey}`

    try {
        const response = await httpService.get(url)
        const result = response.data.results[0]
        const { formatted_address: name, geometry: { location: { lat, lng } } } = result
        return { name, lat, lng }
    } catch (error) {
        console.error(`Error searching for location: ${locationName}`, error)
        throw new Error(`Error searching for location: ${locationName}`)
    }
}

function setUserLoc() {
    const hasApprovedLocation = localStorage.getItem('hasApprovedLocation')

    if (!hasApprovedLocation) {
        console.log('!hasApprovedLocation', hasApprovedLocation);

        Swal.fire({
            title: 'Approve Location Service',
            text: 'App uses Location Service to provide better user experience',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Approve Location Service!'
        }).then(async (result) => {
            try {
                if (result.isConfirmed) {
                    localStorage.setItem('hasApprovedLocation', true);
                    Swal.fire(
                        'Location Service Approved!',
                        'You can now enjoy better user experience!',
                        'success'
                    )
                }
            } catch (error) {
                console.error('Error setting user location:', error);
            }
        })
    }

    if (!navigator.geolocation) {
        showErrorMsg('HTML5 Geolocation is not supported in your browser')
        return
    }
    // Define a function to handle the successful retrieval of the user's location.
    const onSuccessSetUserLoc = (position) => {
        const { latitude: lat, longitude: lng } = position.coords
        const location = { lat, lng }
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(location))

        // Create a new date object follow User By current hour.
        const date = new Date()
        date.setMinutes(0)
        date.setSeconds(0)

        // OPT - Convert the date to a string with only the hour.
        // const dateString = date.toLocaleDateString('en-US', {
        //     hour: 'numeric', // || 2-digit || numeric
        //     hour12: true,
        //     timeZoneName: 'long' // short || long || longGeneric || longOffset
        // })

        locsMap[date] = location
        _saveUserLocsToStorage()
    }
    // Define a function to handle errors when retrieving the user's location.
    const onErrorSetUserLoc = (err) => {
        console.error("Error getting user location:", err)
        switch (err.code) {
            case 0:
                showErrorMsg("There was an error while retrieving your location: " + err.message)
                break
            case 1:
                showErrorMsg("The user didn't allow this page to retrieve a location.")
                break
            case 2:
                showErrorMsg("The browser was unable to determine your location: " + err.message)
                break
            case 3:
                showErrorMsg("The browser timed out before retrieving the location.")
                break
            default:
                const defaultLocation = storageService.get(STORAGE_KEY) || {
                    [new Date()]: { lat: 32.08, lng: 34.78 }
                }
                sessionStorage.setItem(SESSION_KEY, JSON.stringify(defaultLocation))
        }
    }
    // Use a Promise-based approach to simplify error handling.
    navigator.geolocation.getCurrentPosition(onSuccessSetUserLoc, onErrorSetUserLoc)
}

function getDistanceFromLatLng(userLat, userLng, stayLat, stayLng) {
    const earthRadius = 6371 // Earth's radius in kilometers
    const dLat = deg2rad(stayLat - userLat)
    const dLng = deg2rad(stayLng - userLng)
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(userLat)) * Math.cos(deg2rad(stayLat)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    // const milDistance = (earthRadius * c) / 1.609344; // Distance in miles
    const distance = earthRadius * c // Distance in kilometers
    return parseInt(distance)
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

function _saveUserLocsToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(locsMap))
}

function _loadUserLocsFromStorage() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY))
}