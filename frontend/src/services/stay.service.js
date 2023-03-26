import { storageService } from './async-storage.service.js'
import { showErrorMsg } from './event-bus.service.js'
const DEMO_STAYS = require('../assets/data/stay.json')
const REGIONS = ['flexible', 'new-york', 'middle-east', 'italy', 'south-america', 'france']
const PROPERTY_TYPES = ['house', 'hotel', 'apartment', 'guesthouse']
const AMENITIES = []
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
    setRate,
}

function setRate(stay) {
    console.log(`🚀 ~ stay:`, stay)
    const { reviews } = stay
    if (!reviews || !reviews.length) return null

    const reviewsCount = reviews.length

    const avgRate = reviews.reduce(
        (accRate, review) => accRate + review.rate, 0
    ) / reviewsCount || null

    stay.avgRate = avgRate
    return avgRate
}

async function query(filterBy = { txt: '' }, sortBy = { price: 1 }) {
    var stays = gStays
    try {
        stays = await storageService.query(STORAGE_KEY)
        if (stays) _saveToLocalStorage(stays)

        /* filter */
        const filterStays = _getFilterStays(stays, filterBy)

        /* sort */
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

        /* pagination */
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

function _getFilterStays(stays, filterBy) {
    const {
        startIdx,
        regex,
        region, label,
        amenities, placeTypes, propertyTypes,
        checkIn, checkOut,
        minPrice, maxPrice,
        minCapacity, maxCapacity,
        minRate, maxRate,
        minBed, maxBed,
        minBedroom, maxBedroom,
        minBathroom, maxBathroom,
    } = _buildCriteria(filterBy)

    console.group('filter')

    let filteredStays = stays.filter(stay => {
        return regex.test(stay.name.substring(stay.summary))

            // && amenities.every(amenity => stay.amenities.includes(amenity))

            && stay.price >= minPrice && stay.price <= maxPrice

            && stay.capacity >= minCapacity && stay.capacity <= maxCapacity

        // && stay.rate >= minRate && stay.rate <= maxRate

        // && stay.beds >= minBed && stay.beds <= maxBed

        // && stay.bedrooms >= minBedroom && stay.bedrooms <= maxBedroom

        // && stay.bathrooms >= minBathroom && stay.bathrooms <= maxBathroom

        // && (!checkIn || new Date(checkIn) >= new Date(stay.startDate))
        // && (!checkOut || new Date(checkOut) <= new Date(stay.endDate))
    })
    console.log(`🚀 ~ price & capacity:`, filteredStays)

    if (region) filteredStays = filteredStays.filter(stay => stay.region === region)
    console.log(`🚀 ~  region:`, filteredStays)

    if (label) filteredStays = filteredStays.filter(stay => stay.label === label)
    console.log(`🚀 ~  label:`, filteredStays)

    if (placeTypes.length > 0) filteredStays = filteredStays.filter(stay => placeTypes.includes(stay.placeType))
    console.log(`🚀 ~  placeTypes:`, filteredStays)

    if (propertyTypes.length > 0) filteredStays = filteredStays.filter(stay => propertyTypes.includes(stay.propertyType))


    /* pagination */
    const filterStaysCount = filteredStays.length

    filteredStays = filteredStays.slice(startIdx, startIdx + STAYS_PER_PAGE)

    const maxPageIdx = Math.ceil(filterStaysCount / STAYS_PER_PAGE)

    console.log(`🚀 ~  pagination:`, ...{
        pageIdx: filterBy.pageIdx,
        maxPageCount: maxPageIdx,
        filterStaysCount,
    })
    console.groupEnd('filter')
    return {
        stays: filteredStays,
        pagination: {
            pageIdx: filterBy.pageIdx,
            maxPageIdx,
            filterStaysCount,
        },
    }
}

function _buildCriteria({
    pageIdx,
    txt,
    region, label,
    amenities, placeTypes, propertyTypes,
    dates,
    prices, capacities, rates,
    beds, bedrooms, bathrooms, sortBy
}) {
    const startIdx = pageIdx * STAYS_PER_PAGE // todo: move to backend (with all the filterBy)
    const regex = new RegExp(txt, 'i')/* Text: stay name and summery */

    /* Select */
    region = region || ''
    label = label || ''

    /* Array */
    amenities = amenities || []
    placeTypes = placeTypes || []
    propertyTypes = propertyTypes || []

    /* Range Array */
    let [minPrice, maxPrice] = prices
    let [minCapacity, maxCapacity] = capacities
    let [minRate, maxRate] = rates
    let [minBed, maxBed] = beds
    let [minBedroom, maxBedroom] = bedrooms
    let [minBathroom, maxBathroom] = bathrooms
    let [checkIn, checkOut] = dates

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


// return [min,max]
function getRange(stays, field) {
    return stays.reduce((accRange, stay) => [
        Math.min(accRange[0], stay[field]),
        Math.max(accRange[1], stay[field])
    ], [Infinity, -Infinity])
}

function _loadFromLocalStorage() {
    const stays = localStorage.getItem(STORAGE_KEY)
    return stays ? JSON.parse(stays) : null
}

function _saveToLocalStorage(stays) {
    localStorage.getItem(STORAGE_KEY, stays)
}