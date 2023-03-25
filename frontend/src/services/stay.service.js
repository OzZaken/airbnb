import { storageService } from './async-storage.service.js'
import { showErrorMsg } from './event-bus.service.js'
const DEMO_STAYS = require('../assets/data/stay.json')
const STORAGE_KEY = 'stay'
const REGION = ['flexible', 'new york', 'middle-east', 'italy', 'south-america', 'france']
const PROPERTY_TYPES = ['House', 'Hotel', 'Apartment', 'Guesthouse']
const LABELS = [
    /* {img src key: title } */
    { 'omg': 'OMG!' },
    { 'beach': 'Beach!' },
    { 'national-park': 'National parks' },
    { 'amazing-pool': 'Amazing pools' },
    { 'amazing-views': 'Amazing views' },
    { 'arctic': 'Arctic' },
    { 'design': 'Design' },
    { 'island': 'Island' },
]
const AMENITIES = []
const PLACE_TYPES = [
    /* {key: title } */
    { home: 'Entire home/apt' },
    { privetRoom: 'Private room' },
    { sharedRoom: 'Shared room' }
]
const STAYS_PER_PAGE = 20

var gStays = loadFromLocalStorage() || null

export const stayService = {
    query,
    save,
    remove,
    getById,
    get,
    AMENITIES,
    LABELS,
    PROPERTY_TYPES,
    PLACE_TYPES,
    REGION,
}

async function query(filter = { txt: '' }, sort = { price: 1 }) {
    var stays = gStays
    try {
        stays = await storageService.query(STORAGE_KEY)
        if (stays) _saveToLocalStorage(stays)

        const {
            isLoading,// Boolean
            startIdx,// Number
            regex, region, // String
            placeTypes, propertyTypes, amenities, // Array 
            minPrice, maxPrice, minCapacity, maxCapacity, minRate, maxRate,// Range numbers [min,max]
            checkIn, checkOut // Date range
        } = _buildFilters(filter)

        /* filter */
        stays = stays.filter(stay => {
            return regex.test(stay.name.substring(stay.summary))
                // && placeTypes.includes(stay.placeType)
                // && propertyTypes.includes(stay.propertyType)
                && amenities.every(amenity => stay.amenities.includes(amenity))
                && stay.price > minPrice
                && stay.price < maxPrice
                && stay.capacity > minCapacity
                && stay.capacity < maxCapacity
            // && region.includes(stay.region)
            // && (typeof stay.rate === 'number' && stay.rate >= minRate && stay.rate <= maxRate)
            // && (!checkIn || new Date(checkIn) >= new Date(stay.startDate))
            // && (!checkOut || new Date(checkOut) <= new Date(stay.endDate))
        })

        /* sort */
        const [sortByKey, isDesc = null] = Object.entries(sort)[0]
        switch (sortByKey) {
            case 'price':
                stays = stays.sort((t1, t2) => t1.price - t2.price * isDesc)
                break

            case 'name':
                stays = stays.sort((t1, t2) => t1.name.localeCompare(t2.name) * isDesc)
                break

            case 'rate':
                stays = stays.sort((t1, t2) => t1.rate - t2.rate * isDesc)
                break

            case 'capacity':
                stays = stays.sort((t1, t2) => t1.capacity - t2.capacity * isDesc)
                break
            default:
                return stays
        }

        /* paging */
        stays = stays.slice(startIdx, startIdx + STAYS_PER_PAGE)
        console.log(stays.length)

    } catch (err) {
        console.log('filterBy from storage has been failed', err)
    }
    finally {
        /* put demo data on fatal error (demonstration only)*/
        if (!stays || !stays.length) {
            showErrorMsg('Loading stays Fail')
            storageService.postMany(STORAGE_KEY, DEMO_STAYS)
            stays = DEMO_STAYS
        }
        return stays
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

function loadFromLocalStorage() {
    const stays = localStorage.getItem(STORAGE_KEY)
    return stays ? JSON.parse(stays) : null
}
function _saveToLocalStorage(stays) {
    localStorage.getItem(STORAGE_KEY, stays)
}

function _buildFilters({ txt, pageIdx, region, placeTypes, propertyTypes, amenities, priceRange, capacityRange, rateRange, dateRange }) {

    const startIdx = pageIdx * STAYS_PER_PAGE
    const regex = new RegExp(txt, 'i')

    region = region || ''
    placeTypes = placeTypes || []
    amenities = amenities || []
    propertyTypes = propertyTypes || []

    // ranges[min,max]:
    let [minPrice, maxPrice] = priceRange
    let [minCapacity, maxCapacity] = capacityRange
    let [minRate, maxRate] = rateRange
    let [checkIn, checkOut] = dateRange

    minPrice = minPrice || 0
    maxPrice = maxPrice || Infinity
    minCapacity = minCapacity || 0
    maxCapacity = maxCapacity || Infinity
    minRate = minRate || 0
    maxRate = maxRate || 5
    checkIn = checkIn ? new Date(checkIn) : null
    checkOut = checkOut ? new Date(checkOut) : null

    return {
        regex,// text: name and summery 
        startIdx,// num: front paging 
        region,// select
        amenities, placeTypes, propertyTypes,// checkbox
        minPrice, maxPrice,
        minCapacity, maxCapacity,
        minRate, maxRate,
        checkIn, checkOut // DateRange[min,max]:
    }
}