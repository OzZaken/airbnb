import { storageService } from './async-storage.service.js'
var gDefaultStays = require('../assets/data/stay.json')

export const stayService = {
    query,
    save,
    remove,
    getById,
    getAmenities,
}

const STORAGE_KEY = 'stay'
const STAYS_PER_PAGE = 20
const gAmenities = [
    { Omg: 'OMG!' },
    { Beach: 'Beach!' },
    { NationalPark: 'National parks' },
    { AmazingPool: 'Amazing pools' },
    { AmazingViews: 'Amazing views' },
    { Arctic: 'Arctic' },
    { Design: 'Design' },
    { Island: 'Island' },
    { Surfing: 'Surfing' },
    { Omg: 'OMG!' },
    { Beach: 'Beach!' },
    { NationalPark: 'National parks' },
    { AmazingPool: 'Amazing pools' },
    { AmazingViews: 'Amazing views' },
    { Arctic: 'Arctic' },
    { Design: 'Design' },
    { Island: 'Island' },
    { Surfing: 'Surfing' },
    { Omg: 'OMG!' },
    { Beach: 'Beach!' },
    { NationalPark: 'National parks' },
    { AmazingPool: 'Amazing pools' },
    { AmazingViews: 'Amazing views' },
    { Arctic: 'Arctic' },
    { Design: 'Design' },
    { Island: 'Island' },
    { Surfing: 'Surfing' },
]

async function query(filterBy = { txt: '' }) {
    try {
        var stays = await storageService.query(STORAGE_KEY)
        // DEMO_DATA
        if (!stays || !stays.length) {
            storageService.postMany(STORAGE_KEY, gDefaultStays)
            stays = gDefaultStays
        }
       
        var { txt, minPrice, maxPrice,amenities,pageIdx } = filterBy //,checkIn,checkOut
        const regex = new RegExp(txt, 'i')
        maxPrice = maxPrice || Infinity
        minPrice = minPrice || 0
        amenities = amenities || []
        pageIdx = pageIdx || 1
        // const startIdx = pageIdx * STAYS_PER_PAGE // this for sending on backend the relevent
        stays = stays.slice(0, pageIdx * STAYS_PER_PAGE)
        stays = stays.filter(stay =>
            regex.test(stay.name.substring(stay.summary))
            && stay.price < maxPrice
            && stay.price > minPrice
            && amenities.every(amenity => stay.amenities.includes(amenity))
        )
        return stays
    } catch (err) {
        console.log('filterBy from storage has been failed', err)
    }
}

function getById(stayId) {
    return storageService.get(STORAGE_KEY, stayId)
}

function remove(stayId) {
    return storageService.remove(STORAGE_KEY, stayId)
}

function save(stay) {
    if (stay._id) return storageService.put(STORAGE_KEY, stay)
    else {
        stay.createdAt = Date.now()
        stay.amenities = []
        return storageService.post(STORAGE_KEY, stay)
    }
}

function getAmenities() {
    return gAmenities
}