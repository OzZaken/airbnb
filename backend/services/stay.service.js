import { ObjectId } from 'mongodb'
const fs = require('fs')

var gStays = require('../data/stay.json')

const STAYS_PER_PAGE = 20

module.exports = {
    query,
    getById,
    save,
    remove
}

async function query({
    txt,
    destination,
    amenities,
    bookingRange, placeType, propertyType, priceRange, rateRange, capacityRange
}, pageIdx) {

    var stays = gStays
    const { txt, destination, amenities, placeType, propertyType,
        priceRange, rateRange, capacityRange, bookingRange } = filterBy

    // Filter
    if (txt) {
        const regex = new RegExp(txt, 'i') // 'i' makes the search case-insensitive
        stays = stays.filter(stay => regex.test(stay.name) || regex.test(stay.summary))
    }

    // FilterBy Dates 
    if (bookingRange) {
        stays = stays.filter(stay => {
            const bookings = stay.bookings.filter(booking => {
                const [checkIn, checkOut] = booking
                return checkIn >= bookingRange[0] && checkOut <= bookingRange[1]
            })
            return bookings.length > 0
        })
    }

    //  at least one amenity in the array satisfies. 
    if (amenities && amenities.length > 0) stays = stays.filter(stay => stay.amenities.some(amenity => amenities.includes(amenity)))

    if (placeType && placeType.length > 0) stays = stays.filter(stay => placeType.includes(stay.placeType))

    if (propertyType && propertyType.length > 0) stays = stays.filter(stay => propertyType.includes(stay.propertyType))

    if (priceRange) stays = stays.filter(stay => stay.price >= priceRange[0] && stay.price <= priceRange[1])

    if (rateRange) stays = stays.filter(stay => stay.avgRate >= rateRange[0] && stay.avgRate <= rateRange[1])

    if (capacityRange) stays = stays.filter(stay => stay.capacity >= capacityRange[0] && stay.capacity <= capacityRange[1])

    if (destination) stays = stays.filter(stay => stay.destination === destination)

    // pageIdx
    if (pageIdx !== undefined) {
        const startIdx = filterBy.pageIdx * STAYS_PER_PAGE
        stays = stays.slice(startIdx, startIdx + STAYS_PER_PAGE)
    }

    return stays
}

function getById(stayId) {
    const stay = gStays.find(stay => stay._id === stayId)
    return Promise.resolve(stay)
}

function remove(stayId, user) {
    try {
        const stayIdx = gStays.findIndex(stay => stay._id === stayId)
        if (gStays[stayIdx].host._id !== user._id) throw new Error('you cant do this')

        gStays = gStays.filter(stay => stay._id !== stayId)
        return _saveStaysToFile()
    } catch (error) {
        return Promise.reject(error.message)
    }
}

function save(stay, user) {
    try {
        if (stay._id) {
            const stayIdx = gStays.findIndex(currStay => currStay._id === stay._id)
            if (gStays[stayIdx].host._id !== user._id) throw new Error('You cannot do this')

            const stayToUpdate = gStays.find(currStay => currStay._id === stay._id)
            stayToUpdate.name = stay.name
            stayToUpdate.summary = stay.summary

        } else {
            stay._id = _makeId()
            stay.createdAt = Date.now()
            stay.host = { ...user }
            gStays.unshift(stay)
        }

        return _saveStaysToFile().then(() => stay)
    } catch (error) {
        return Promise.reject(error.message)
    }
}

async function _saveStaysToFile() {
    const data = JSON.stringify(gStays, null, 2)
    try {
        await fs.promises.writeFile('data/stay.json', data)
    } catch (error) {
        throw new Error('Cannot save to file')
    }
}

function _makeId() {
    return ObjectId().toString()
}