const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('stay')
        var stays = await collection.find(criteria).toArray()
        return stays
    } catch (err) {
        logger.error('cannot find stays', err)
        throw err
    }
}

async function getById(stayId) {
    try {
        const collection = await dbService.getCollection('stay')
        const stay = await collection.findOne({ _id: ObjectId(stayId) })
        return stay
    } catch (err) {
        logger.error(`while finding stay ${stayId}`, err)
        throw err
    }
}

async function remove(stayId) {
    try {
        const collection = await dbService.getCollection('stay')
        await collection.deleteOne({ _id: ObjectId(stayId) })
        return stayId
    } catch (err) {
        logger.error(`cannot remove stay ${stayId}`, err)
        throw err
    }
}

async function add(stay) {
    try {
        const collection = await dbService.getCollection('stay')
        const addedStay = await collection.insertOne(stay)
        return addedStay
    } catch (err) {
        logger.error('cannot insert stay', err)
        throw err
    }
}

async function update(stay) {
    try {
        var id = ObjectId(stay._id)
        delete stay._id
        const collection = await dbService.getCollection('stay')
        await collection.updateOne({ _id: id }, { $set: { ...stay } })
        return stay
    } catch (err) {
        logger.error(`cannot update stay ${stay._id}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {
        price: {}
    }
    const { priceRange, bedrooms, propertyTypes, placeTypes, amenities } =
        filterBy
    const [minPrice, maxPrice] = priceRange

    const chosePropertyTypes = Object.keys(propertyTypes).filter(
        (p) => propertyTypes[p]
    )
    const checkedPlaceTypes = Object.keys(placeTypes).filter(
        (p) => placeTypes[p]
    )
    const checkedAmenities = Object.keys(amenities).filter((a) => amenities[a])

    if (chosePropertyTypes.length) {
        const typesRegex = chosePropertyTypes.map(
            (t) => new RegExp(`^${t}$`, 'i')
        )
        criteria.propertyType = { $in: typesRegex }
    }

    if (checkedAmenities.length) {
        const amenitiesRegex = checkedAmenities.map(
            (a) => new RegExp(`^${a}$`, 'i')
        )
        criteria.amenities = { $all: amenitiesRegex }
    }

    if (checkedPlaceTypes.length) {
        criteria.placeType = { $in: checkedPlaceTypes }
    }

    if (minPrice) {
        criteria.price = { ...criteria.price, $gte: minPrice }
    }

    if (maxPrice) {
        criteria.price = { ...criteria.price, $lte: maxPrice }
    }

    if (bedrooms) {
        criteria.bedrooms = { $eq: bedrooms }
    }

    return criteria
}

module.exports = {
    query,
    getById,
    add,
    update,
    remove
}
