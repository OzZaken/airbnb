import { storageService } from './async-storage.service.js'

var gDefaultStays = require('../assets/data/stay.json')

const STORAGE_KEY = 'stay'

const PER_PAGE = 20

const PLACE_TYPES = [
    /* {img src key: title } */
    { 'home': 'Entire home/apt' },
    { 'privet-room': 'Private room' },
    { 'shared-room': 'Shared room' }
]
const AMENITIES = [
    { 'omg': 'OMG!' },
    { 'beach': 'Beach!' },
    { 'national-park': 'National parks' },
    { 'amazing-pool': 'Amazing pools' },
    { 'amazing-views': 'Amazing views' },
    { 'arctic': 'Arctic' },
    { 'design': 'Design' },
    { 'island': 'Island' },
]
const REGION = ['flexible', 'new york', 'middle-east', 'italy', 'south-america', 'france']
const PROPERTY_TYPES = ['House', 'Hotel', 'Apartment', 'Guesthouse']

export const stayService = {
    query,
    save,
    remove,
    getById,
    get,
    AMENITIES,
    PROPERTY_TYPES,
    PLACE_TYPES,
    REGION,
}

async function query(filterBy, pageIdx) {
    try {
        var stays = await storageService.query(STORAGE_KEY)

        /* DEMO_DATA */
        if (!stays || !stays.length) {
            storageService.postMany(STORAGE_KEY, gDefaultStays)
            stays = gDefaultStays
        }

        /* PAGE_IDX */
        pageIdx = pageIdx || 1
        stays = stays.slice(0, pageIdx * PER_PAGE)
        // const startIdx = pageIdx * STAYS_PER_PAGE // sending  backend the relents
        
        /* SORT */

        /* FILTER */
        let { txt, placeType, propertyType, region, amenities, priceRange, capacityRange, dateRange, rateRange } = filterBy

        // BY array ~ placeType , Amenities , propertyType ,region
        placeType = placeType || []
        amenities = amenities || []
        propertyType = propertyType || []

        // BY array ~ placeType , Amenities , propertyType ,region
        // region = region || []

        // BY number  ~ price
        let [minPrice, maxPrice] = priceRange
        minPrice = minPrice || 0
        maxPrice = maxPrice || Infinity

        // BY ~ Capacity
        let [minCapacity, maxCapacity] = capacityRange
        minCapacity = minCapacity || 0
        maxCapacity = maxCapacity || Infinity

        // BY ~ Rate
        let [minRate, maxRate] = rateRange
        minRate = minRate || 0
        maxRate = maxRate || 5

        // BY ~ Date
        let [checkIn, checkOut] = dateRange
        checkIn = checkIn ? new Date(checkIn) : null
        checkOut = checkOut ? new Date(checkOut) : null

        const regex = new RegExp(txt, 'i')
        stays = stays.filter(stay =>
            regex.test(stay.name.substring(stay.summary))
            && regex.test(stay.placeType)
            && placeType.includes(stay.placeType)
            && propertyType.includes(stay.propertyType)
            && amenities.every(amenity => stay.amenities.includes(amenity))
            && stay.price > minPrice && stay.price < maxPrice
            && stay.capacity > minCapacity && stay.capacity < maxCapacity // OPT ~ if capacity is optinal : USE (!minCapacity || stay.capacity >= minCapacity) && (!maxCapacity || stay.capacity <= maxCapacity)
            // && region.includes(stay.region)
            // && (typeof stay.rate === 'number' && stay.rate >= minRate && stay.rate <= maxRate)
            // && (!checkIn || new Date(checkIn) >= new Date(stay.startDate))
            // && (!checkOut || new Date(checkOut) <= new Date(stay.endDate))
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

function get(key) {
    return this[key]
}

function getById(stayId) {
    return storageService.get(STORAGE_KEY, stayId)
}

// removeIdsFromFile('../assets/data/stay.json')

// function removeIdsFromFile(filename) {
//     const stays = require(`./${filename}`)
  
//     stays.forEach((stay) => {
//       delete stay._id
//       delete stay.id
//     })
  
//     const data = JSON.stringify(stays, null, 2)
  
//     fs.writeFileSync(`../assets/data/${filename}`, data, 'utf8')
//   }