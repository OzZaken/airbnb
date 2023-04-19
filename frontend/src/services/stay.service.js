import { storageService } from './async-storage.service.js' // when backend is set import { httpService } from './http.service.js'
import { saveToLocalStorage, loadFromLocalStorage } from './browser-storage.service.js' 
import { showErrorMsg } from './event-bus.service.js'
const DATA = require('../assets/data/stay-data.json')
const DEMO_STAYS = require('../assets/data/stay.json')
const STORAGE_KEY = 'stay'
const STAYS_PER_PAGE = 20 

var gStays = loadFromLocalStorage(STORAGE_KEY) || null

const stayService = {
    save,       /* Create, Update */
    remove,     /* Delete */
    getById,    /* Read */
    query,      /* List */
    getStays,   /* stays from Local Storage */
    getData,    /* stays data (in typescript convert to file of types and instance) */
    getRange,   /* range */
    getAvg      /* average */
}

export default stayService

// ---------------------------------   CRUD   ---------------------------------  
async function query(filterBy, sortBy = null) {
    var stays = gStays
    const pageMap = {}

    try {
        /* put demo data on error (demonstration only)*/
        if (!stays || !stays.length) {
            console.log('!stays || !stays.length', !stays || !stays.length)
            // showErrorMsg('Loading stays Fail')
            storageService.postMany(STORAGE_KEY, DEMO_STAYS)
            stays = DEMO_STAYS
            // return null
        }

        stays = await storageService.query(STORAGE_KEY)
        // if(stays)_saveToLocalStorage(stays)
        pageMap.totalPageIdx = Math.ceil(stays.length / STAYS_PER_PAGE)

        /* filter */
        const criteria = _buildCriteria(filterBy)
        stays = _getFilterBy(stays, criteria)

        /* sort */
        stays = _getSortBy(stays, sortBy)

        /* pagination */
        const { pageIdx } = filterBy
        const filterStaysCount = stays.length
        pageMap.maxPageIdx = Math.ceil(filterStaysCount / STAYS_PER_PAGE)

        stays = stays.slice(pageIdx, pageIdx + STAYS_PER_PAGE)

    } catch (err) {
        console.log('filterBy from storage has been failed', err)
    }
    finally {
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

function getById(stayId) {
    return storageService.get(STORAGE_KEY, stayId)
}

// ---------------------------------   statistic   ---------------------------------  
function getStays() {
    return gStays
}

function getData(field = null) {
    if (field) return DATA[field]
    else return DATA
}

function getRange(stays = gStays, field) {
    if (field) return _getMinMax(stays, field)

    const rangeMap = {}
    const fields = ['price', 'capacity', 'bathrooms', 'bedrooms']
    for (let i = 0; i < fields.length; i++) {
        rangeMap[fields[i]] = _getMinMax(stays, fields[i])
    }
    return rangeMap
}

function getAvg(stays = gStays, field) {
    // ['capacity', 'bathrooms', 'bedrooms']
    if (field === 'rate') {
        if (stays && stays.length === 1) _getAvgRate(stays) // NOTE: stay`s` contain 1 Entity.
        else _getAvgRates(stays)
    }
    else if (field === 'price') {
        const totalPrice = stays.reduce((acc, stay) => acc + stay.price, 0)
        const avgPrice = totalPrice / stays.length || null
        return avgPrice
    }
}

// ---------------------------------   query params   ---------------------------------  
/* criteria */
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

    /* Ranges */
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

/* filter */
function _getFilterBy(stays = gStays, {
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

/* sort */
function _getSortBy(stays = gStays, sortBy) {
    // shuffle array random sort
    if (!sortBy) return stays.sort(() => Math.random() - 0.5)

    const [field, isDesc = null] = Object.entries(sortBy)[0]
    switch (field) {
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

// ---------------------------------   Privates   ---------------------------------  
function _getMinMax(stays, field) {
    return stays.reduce((accRange, stay) => [
        Math.min(accRange[0], stay[field]),
        Math.max(accRange[1], stay[field])
    ], [Infinity, -Infinity]) || null
}

function _getAvgRates(stays = gStays) {
    const rates = []
    for (let i = 0; i < stays.length; i++) {
        const stay = stays[i]
        const avgRate = _getAvgRate(stay)
        if (avgRate) rates.push(avgRate)
    }
    if (rates.length === 0) return null

    const total = rates.reduce((acc, rate) => acc + rate, 0)
    const avgRate = total / rates.length
    return avgRate
}

function _getAvgRate(stay) {
    const { reviews } = stay
    if (!reviews || !reviews.length) return null

    const reviewsCount = reviews.length
    const avgRate = reviews.reduce(
        (accRate, review) => accRate + review.rate, 0
    ) / reviewsCount || null

    if (!avgRate) {
        console.log('!avgRate')
        return null
    }

    const formatRate = +avgRate.toFixed(2)
    // stay.avgRate = formatRate // NOTE: save only on Client side
    return formatRate
}