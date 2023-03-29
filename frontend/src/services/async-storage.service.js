export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany,
}

function query(entityType, delay = 200) {
    try {
        const entities = JSON.parse(localStorage.getItem(entityType))
        return new Promise(resolve => {
            setTimeout(() => resolve(entities), delay)
        })
    } catch (error) {
        return Promise.reject(error)
    }
}

function post(entityType, newEntity) {
    try {
        newEntity._id = _makeId()
        return query(entityType).then((entities) => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
    } catch (error) {
        return Promise.reject(error)
    }
}

function postMany(entityType, entities) {
    try {
        _save(entityType, entities)
        return Promise.resolve(entities)
    } catch (error) {
        return Promise.reject(error)
    }
}

function get(entityType, entityId) {
    try {
        return query(entityType)
            .then((entities) => entities.find((entity) => entity._id === entityId))
    } catch (err) {
        return Promise.reject(err)
    }
}

function put(entityType, updatedEntity) {
    try {
        return query(entityType)
            .then((entities) => {
                const idx = entities.findIndex((entity) => entity._id === updatedEntity._id);
                entities.splice(idx, 1, updatedEntity)
                _save(entityType, entities)
                return updatedEntity
            })
    } catch (err) {
        return Promise.reject(err)
    }
}

function remove(entityType, entityId) {
    try {
        return query(entityType)
            .then((entities) => {
                const idx = entities.findIndex((entity) => entity._id === entityId)
                entities.splice(idx, 1)
                _save(entityType, entities)
            })
    } catch (err) {
        return Promise.reject(err)
    }
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}