import { storageService } from './async-storage.service.js'

var gDefaultStays = require('../assets/data/stay.json')

const STORAGE_KEY = 'stay'

const STAYS_PER_PAGE = 20

const AMENITIES = [ 
    //{imgSrcMap:heading}
    { omg: 'OMG!' },
    { beach: 'Beach!' },
    { nationalPark: 'National parks' },
    { amazingPool: 'Amazing pools' },
    { amazingViews: 'Amazing views' },
    { arctic: 'Arctic' },
    { design: 'Design' },
    { island: 'Island' },
    { surfing: 'Surfing' },
]

const PROPERTY_TYPES = ['house', 'hotel', 'apartment', 'guesthouse']

const PLACE_TYPES = ['entire home/apt', 'private room', 'shared room']

export const stayService = {
    query,
    save,
    remove,
    getById,
    
    getAmenities,
    getPlaceTypes,
    getPropertyTypes,
}

async function query(filterBy = { txt: '' }) {
    try {
        var stays = await storageService.query(STORAGE_KEY)
        // DEMO_DATA
        if (!stays || !stays.length) {
            storageService.postMany(STORAGE_KEY, gDefaultStays)
            stays = gDefaultStays
        }

        // FILTER
        var { txt, amenities, minPrice, maxPrice, pageIdx } = filterBy
        const regex = new RegExp(txt, 'i')

        maxPrice = maxPrice || Infinity
        minPrice = minPrice || 0
        amenities = amenities || []
        pageIdx = pageIdx || 1
        // const startIdx = pageIdx * STAYS_PER_PAGE // sending  backend the relents
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

function getById(stayId) {
    return storageService.get(STORAGE_KEY, stayId)
}

function getAmenities() {
    return AMENITIES
}

function getPropertyTypes() {
    return PROPERTY_TYPES
}

function getPlaceTypes() {
    return PLACE_TYPES
}