import { httpService } from './http.service'

const BASE_URL = 'stay'

export const stayService = {
    query,
    getById,
    save,
    remove,
    getNextId
}

// Create (POST) and Update (PUT)
async function save(stay) {
    if (stay._id) return await httpService.put(`${BASE_URL}/${stay._id}`, stay)
    else return await httpService.post(BASE_URL, stay)
}

// Delete (DELETE)
async function remove(stayId) {
    return await httpService.delete(BASE_URL + stayId)
}

// Read (GET)
async function query(filterBy = {}) {
    return await httpService.get(BASE_URL, { params: filterBy })
}

async function getById(stayId) {
    return await httpService.get(`${BASE_URL}/${stayId}`)
}

async function getNextId(stayId) {
    try {
        const stays = await httpService.get(STORAGE_KEY)
        const stayIdx = stays.findIndex(stay => stay._id === stayId)
        const nextStayIdx = stayIdx + 1 === stays.length ? 0 : stayIdx + 1
        return stays[nextStayIdx]._id
    } catch (error) {
        console.error(error)
        throw error
    }
}