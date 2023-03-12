const tripCountries = []
var tripDistance = 0

module.exports = {
    addToTrip,
    getTripCountries
}

// Returns the current trip-countries not including the last one
function getTripCountries() {
    // return Array.from(new Set(tripCountries))
    return tripCountries.slice(0, -1)
}
function addToTrip(toCountry) {
    tripCountries.push(toCountry)
    if (tripCountries.length === 1) {
        console.log(`Vamos from ${toCountry.name}`)
        return false
    }
    const fromCountry = tripCountries[tripCountries.length - 2]
    if (fromCountry.latlng && toCountry.latlng) {
        const distance = _distance(...fromCountry.latlng, ...toCountry.latlng)
        console.log(`Trvelling ${distance}Km to ${toCountry.name}`)
        tripDistance += distance
        tripDistance = +tripDistance.toFixed(2)
        console.log(`Curr trip (Distance: ${tripDistance}):`, tripCountries.map(c => c.name))
    }
    if (tripCountries[0].code === toCountry.code) {
        console.log('Back to start point...')
        return true
    } else if (tripCountries.filter(c => c.code === toCountry.code).length > 1) {
        console.log('Liked it ah?')
    }
    return false

}
function _distance(lat1, lng1, lat2, lng2, unit = 'K') {
    if ((lat1 == lat2) && (lng1 == lng2)) return 0
    const radlat1 = Math.PI * lat1 / 180
    const radlat2 = Math.PI * lat2 / 180
    const theta = lng1 - lng2
    const radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
    if (dist > 1) {
        dist = 1
    }
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }

    dist = +dist.toFixed(2)
    return dist
}