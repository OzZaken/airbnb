import { httpService } from './http.service'

const STORAGE_KEY = 'stays'
const BASE_URL = 'stay/'

export const stayService = {
    query,
    save,
    remove,
    getById,
    getNextId,
    loadFromLocalStorage,
    saveToLocalStorage,
}

async function query(filterBy = {}) {
    return await httpService.get(BASE_URL, { params: filterBy })
}

async function getById(stayId) {
    return await httpService.get(BASE_URL + stayId)
}

async function remove(stayId) {
    return await httpService.get(BASE_URL + stayId)
}

async function save(stay) {
    const staySaved = await httpService.get(BASE_URL)
    if (staySaved._id) return await httpService.put(BASE_URL + stay._id, stay)
    return await httpService.post(BASE_URL, stay)
}

function loadFromLocalStorage() {
    const stays = localStorage.getItem(STORAGE_KEY)
    return stays ? JSON.parse(stays) : null
}

function saveToLocalStorage(stays) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stays))
}

async function getNextId(stayId) {
    try {
        const stays = await httpService.get(STORAGE_KEY)
        const stayIdx = stays.findIndex(stay => stay._id === stayId)
        const nextStayIdx = stayIdx + 1 === stays.length ? 0 : stayIdx + 1
        return stays[nextStayIdx]._id
    } catch (error) {
        console.error(error)
    }
}