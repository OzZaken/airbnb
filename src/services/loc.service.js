import { utilService } from './util.service'
import { storageService } from './async-storage.service'

export const locService = {
    getLocs,
    addLocation,
    searchLocation
}

const STORAGE_KEY = 'userLoc'
const locs = _loadLocsFromStorage() || []

async function getLocs() {
    return locs
}

// todo: set api
function searchLocation(locationName) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=AIzaSyDJOS8Lw2pOyAk7dwu1HRePE9DHKTIiAE4`
    return axios.get(url)
        .then(res => res.data.results[0])
        .then(res => {
            return {
                name: res.formatted_address,
                lat: res.geometry.location.lat,
                lng: res.geometry.location.lng
            }
        })
}

function addLocation(name, pos) {
    const location = _createLocation(name, pos)
    locs.push(location)
    _saveLocsSaveToStorage()
}


function _createLocation(name, { lat, lng }) {
    return {
        id: utilService.makeId(),
        name,
        lat,
        lng
    }
}
// todo: work with session storage
function _saveLocsSaveToStorage() {
    storageService.saveToStorage(STORAGE_KEY, locs)
}

function _loadLocsFromStorage() {
    return storageService.loadFromStorage(STORAGE_KEY)
}

function getPosition() {
    if (!navigator.geolocation) {
        alert('HTML5 Geolocation is not supported in your browser')
        return
    }
    // One shot position getting or continus watch
    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError)
    // navigator.geolocation.watchPosition(showLocation, handleLocationError)
}
function showLocation(position) {
    console.log(position);
}
function handleLocationError(error) {
    var locationError = document.getElementById("locationError")

    switch (error.code) {
        case 0:
            locationError.innerHTML = "There was an error while retrieving your location: " + error.message
            break
        case 1:
            locationError.innerHTML = "The user didn't allow this page to retrieve a location."
            break
        case 2:
            locationError.innerHTML = "The browser was unable to determine your location: " + error.message
            break
        case 3:
            locationError.innerHTML = "The browser timed out before retrieving the location."
            break
    }
}
const userLocation = sessionStorage.userLocation ||  getPosition()
sessionStorage.userLocation = userLocation
