const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

module.exports = {
    query,
    remove,
    add
}

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('review')
        let reviews = await collection
            .aggregate([
                {
                    $match: criteria
                },
                {
                    $lookup: {
                        localField: 'stayId',
                        from: 'stay',
                        foreignField: '_id',
                        as: 'stay'
                    }
                },
                {
                    $unwind: '$stay'
                },
                {
                    $lookup: {
                        localField: 'byUserId',
                        from: 'user',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                {
                    $unwind: '$user'
                }
            ])
            .toArray()
        return reviews
    } catch (err) {
        logger.error('cannot find reviews', err)
        throw err
    }
}

async function remove(reviewId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { loggedinUser } = store
        const collection = await dbService.getCollection('review')
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(reviewId) }
        if (!loggedinUser.isAdmin)
            criteria.byUserId = ObjectId(loggedinUser._id)
        const { deletedCount } = await collection.deleteOne(criteria)
        return deletedCount
    } catch (err) {
        logger.error(`cannot remove review ${reviewId}`, err)
        throw err
    }
}

async function add(review) {
    console.log('review', review)
    try {
        const reviewToAdd = {
            byUserId: ObjectId(review.byUserId),
            stayId: ObjectId(review.stayId),
            text: review.text,
            rating: review.rating
        }
        const collection = await dbService.getCollection('review')
        await collection.insertOne(reviewToAdd)
        return reviewToAdd
    } catch (err) {
        logger.error('cannot insert review', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.byUserId) criteria.byUserId = ObjectId(filterBy.byUserId)
    if (filterBy.stayId) criteria.stayId = ObjectId(filterBy.stayId)
    return criteria
}