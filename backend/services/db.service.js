const MongoClient = require('mongodb').MongoClient
const ObjectId = require("mongodb").ObjectId
const { omit, map, find, transform, uniqueId } = require('lodash')
const makeId = require('./util.service')

const config = require('../config')
const stays = require('../data/stay.json')
const user = require('../data/user.json')
const countries = require('../data/countries.json')
const translate = require('../data/translate.json')

const COLLECTION_DB = 'stay_DB'

// LOCAL_DB
const LOCAL_COLLECTS_DB = {
    countries,
    translate,
    stays, // todo: delete
    user // todo: delete
}

var dbConn = null

module.exports = {
    getCollection,
    getLocal,
}

// returns a collection from a MongoDB database. 
async function getCollection(collectName) {
    try {
        const db = await connect()
        const collect = await db.collection(collectName)
        return collect
    } catch (err) {
        logger.error(`Failed to get Mongo collection ${collectName}`, err)
        throw err
    }
}

// establishes a connection to the MongoDB database and returns the database object.
async function connect() {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
        const db = client.db(COLLECTION_DB)
        dbConn = db
        return db
    } catch (err) {
        logger.error('Cannot Connect to DB', err)
        throw err
    }
}

function getLocal(localCollectName) {
    return LOCAL_COLLECTS_DB[localCollectName]
}

/**creates a map of old IDs to new IDs by looping through each object in each collection
 *  and checking if it has an "id", "_id", or "hostBy" field.
 *  If it does, it generates a new ID using the uniqueId function from the Lodash library or creates a new MongoDB ObjectId,
 *  and stores the old and new values in the idMap.
 *  If it doesn't have any of those fields, it simply copies over the existing key-value pairs unchanged.
 loops through each object in each collection again
 * and for each key-value pair in the object, it checks if the value is an old ID in the idMap.
 * If it is, it replaces the value with the corresponding new ID from the idMap.
 * If it isn't, it simply copies over the existing key-value pairs unchanged.

Finally, the function returns a new array of collections, where each object's ID fields have been replaced with new values. */
function _replaceIds(collects) {
    const idMap = transform(collects, (collectsAcc, collect) => {
        // Loop through each object in the collection
        map(collect, object => {
            // Loop through each key-value pair in the object
            transform(object, (objAcc, obj, currKey) => {
                // Check if the key is "id", "_id", or "hostBy"
                if (["id", "_id", "hostBy", 'byUserId', 'stayId'].includes(currKey)) {

                    // If the key is "id", generate a new unique ID using lodash
                    if (currKey === "id") objAcc[currKey] = uniqueId(`review-${makeId(8)}`)

                    // Otherwise, create a new MongoDB ObjectId
                    else objAcc[currKey] = new ObjectId(obj)

                    // Store the old value in the idMap for later replacement
                    collectsAcc[obj] = objAcc[currKey]
                }
                // Copy over any other key-value pairs unchanged
                else objAcc[currKey] = obj
            }, {})
        })
    }, {})
    console.log(idMap);
    // Step 2: Replace the IDs in the original collections
    return map(collects, (collection) => {

        // Loop through each object in the collection
        return map(collection, (obj) => {

            // Loop through each key-value pair in the object
            return transform(obj, (newObj, value, key) => {

                // Check if the value is an ID in the idMap
                const newId = find(idMap, (v, k) => k === value)

                // Replace the ID with the new value from the idMap
                if (newId !== undefined) newObj[key] = newId

                // Copy over any other key-value pairs unchanged
                else newObj[key] = value

            }, {})
        })
    })
}