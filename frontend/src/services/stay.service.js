import { storageService } from './async-storage.service.js'
import { showErrorMsg } from './event-bus.service.js'
const DEMO_STAYS = require('../assets/data/stay.json')
const REGIONS = ['flexible', 'new-york', 'middle-east', 'italy', 'south-america', 'france']
const PROPERTY_TYPES = ['house', 'hotel', 'apartment', 'guesthouse']
const AMENITIES = [
    "tV",
    "internet",
    "wifi",
    "wheelchair-accessible",
    "kitchen",
    "free-parking-on-premises",
    "elevator",
    "free-street-parking",
    "indoor-fireplace",
    "heating",
    "washer",
    "essentials",
    "lock-on-bedroom-door",
    "24-hour-check-in",
    "hangers",
    "iron",
    "laptop-friendly-workspace",
    "hot-water",
    "host-greets-you"
]
/* {image src key: title } */
const PLACE_TYPES = [
    { 'home': 'Entire home/apt' },
    { 'privet-room': 'Private room' },
    { 'shared-room': 'Shared room' }
]
const LABELS = [
    { 'omg': 'OMG!' },
    { 'beach': 'Beach!' },
    { 'national-park': 'National parks' },
    { 'amazing-pool': 'Amazing pools' },
    { 'amazing-views': 'Amazing views' },
    { 'arctic': 'Arctic' },
    { 'design': 'Design' },
    { 'island': 'Island' },
]

const STORAGE_KEY = 'stay'

const STAYS_PER_PAGE = 20 // todo move to backend

var gStays = _loadFromLocalStorage() || null

export const stayService = {
    query,
    save,
    remove,
    getById,
    getData,
    getRange,
    setRates, setRate,
}

async function query(filterBy, sortBy) {
    var stays = gStays
    const pageMap = {}
    try {
        stays = await storageService.query(STORAGE_KEY)
        if (stays) {
            pageMap.totalPageIdx = Math.ceil(stays.length / STAYS_PER_PAGE)
            _saveToLocalStorage(stays)
        }

        /* filter */
        const criteria = _buildCriteria(filterBy)
        stays = _getStaysFilterBy(stays, criteria)

        /* sort */
        stays = _getStaysSortBy(stays, sortBy)

        /* pagination */
        const { pageIdx } = filterBy
        const filterStaysCount = stays.length
        pageMap.maxPageIdx = Math.ceil(filterStaysCount / STAYS_PER_PAGE)

        stays = stays.slice(pageIdx, pageIdx + STAYS_PER_PAGE)

    } catch (err) {
        console.log('filterBy from storage has been failed', err)
    }
    finally {
        /* put demo data on fatal error (demonstration only)*/
        if (!stays || !stays.length) {
            console.log('!stays || !stays.length', !stays || !stays.length)
            showErrorMsg('Loading stays Fail')
            storageService.postMany(STORAGE_KEY, DEMO_STAYS)
            stays = DEMO_STAYS
            return null
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

function getData(askKey = null) {
    const data = {
        AMENITIES,
        LABELS,
        PLACE_TYPES,
        PROPERTY_TYPES,
        REGIONS,
    }
    if (askKey) return data[askKey]
    else return data
}

function getById(stayId) {
    return storageService.get(STORAGE_KEY, stayId)
}

// return [min,max]
function getRange(stays, field) {
    return stays.reduce((accRange, stay) => [
        Math.min(accRange[0], stay[field]),
        Math.max(accRange[1], stay[field])
    ], [Infinity, -Infinity])
}

function setRates(stays) {
    for (let i = 0; i < stays.length; i++) {
        setRate(stays[i])
    }
}

function setRate(stay) {
    const { reviews } = stay
    if (!reviews || !reviews.length) return null

    const reviewsCount = reviews.length

    const avgRate = reviews.reduce(
        (accRate, review) => accRate + review.rate, 0
    ) / reviewsCount || null

    stay.avgRate = avgRate
    return avgRate
}

// filter helper
function _buildCriteria({
    pageIdx,
    txt,
    region, label,
    amenities, placeTypes, propertyTypes,
    dates,
    prices, capacities, rates,
    beds, bedrooms, bathrooms
}) {
    const startIdx = pageIdx * STAYS_PER_PAGE // todo: move to backend (with all the filterBy)
    const regex = new RegExp(txt, 'i') /* Text: stay name and summery */

    /* Select */
    region = region || ''
    label = label || ''

    /* Array */
    amenities = amenities || []
    placeTypes = placeTypes || []
    propertyTypes = propertyTypes || []

    /* Range Array */
    let [checkIn, checkOut] = dates
    let [minPrice, maxPrice] = prices
    let [minCapacity, maxCapacity] = capacities
    let [minRate, maxRate] = rates
    let [minBed, maxBed] = beds
    let [minBedroom, maxBedroom] = bedrooms
    let [minBathroom, maxBathroom] = bathrooms

    // Date
    checkIn = checkIn ? checkIn : null
    checkOut = checkOut ? checkOut : null
    // Price
    minPrice = minPrice || 0
    maxPrice = maxPrice || Infinity
    // Capacity
    minCapacity = minCapacity || 0
    maxCapacity = maxCapacity || Infinity
    // Rate
    minRate = minRate || 0
    maxRate = maxRate || 5
    // Bed
    minBed = minBed || 0
    maxBed = maxBed || Infinity
    // Bedroom
    minBedroom = minBedroom || 0
    maxBedroom = maxBedroom || Infinity
    // Bathroom
    minBathroom = minBathroom || 0
    maxBathroom = maxBathroom || Infinity


    return {
        startIdx, // page
        regex, // name & summery
        region, label, // select
        amenities, placeTypes, propertyTypes,// checkbox
        // ranges
        checkIn, checkOut,
        minPrice, maxPrice,
        minCapacity, maxCapacity,
        minRate, maxRate,
        minBed, maxBed,
        minBedroom, maxBedroom,
        minBathroom, maxBathroom,
    }
}

function _getStaysFilterBy(stays, {
    regex,
    region, label,
    amenities, placeTypes, propertyTypes,
    checkIn, checkOut,
    minPrice, maxPrice,
    minCapacity, maxCapacity,
    minRate, maxRate,
    minBed, maxBed,
    minBedroom, maxBedroom,
    minBathroom, maxBathroom
}) {

    stays = stays.filter(stay => {
        return regex.test(stay.name.substring(stay.summary))
            && amenities.every(amenity => stay.amenities.includes(amenity))
            && stay.price >= minPrice && stay.price <= maxPrice
            && stay.capacity >= minCapacity && stay.capacity <= maxCapacity
        // && stay.rate >= minRate && stay.rate <= maxRate
        // && stay.beds >= minBed && stay.beds <= maxBed
        // && stay.bedrooms >= minBedroom && stay.bedrooms <= maxBedroom
        // && stay.bathrooms >= minBathroom && stay.bathrooms <= maxBathroom
        // && (!checkIn || new Date(checkIn) >= new Date(stay.startDate))
        // && (!checkOut || new Date(checkOut) <= new Date(stay.endDate))
    })

    // select
    if (region) stays = stays.filter(stay => stay.region === region)
    if (label) stays = stays.filter(stay => stay.label === label)

    // Checkbox
    if (placeTypes.length > 0) stays = stays.filter(stay => placeTypes.includes(stay.placeType))
    if (propertyTypes.length > 0) stays = stays.filter(stay => propertyTypes.includes(stay.propertyType))

    console.groupEnd('filter')

    return stays
}

function _getStaysSortBy(stays, sortBy) {
    const [sortByKey, isDesc = null] = Object.entries(sortBy)[0]
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
    return stays
}

// Storage
function _loadFromLocalStorage() {
    const stays = localStorage.getItem(STORAGE_KEY)
    return stays ? JSON.parse(stays) : null
}

function _saveToLocalStorage(stays) {
    localStorage.getItem(STORAGE_KEY, stays)
}