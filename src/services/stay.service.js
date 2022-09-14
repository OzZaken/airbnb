
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { getActionRemoveStay, getActionAddStay, getActionUpdateStay } from '../store/stay.actions.js'
import {store} from '../store/store'

// This file demonstrates how to use a BroadcastChannel to notify other browser tabs 

const STORAGE_KEY = 'stay'
const stayChannel = new BroadcastChannel('stayChannel')


;(()=>{
    stayChannel.addEventListener('message', (ev)=>{
        store.dispatch(ev.data)
    })
})()

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyStay,
}
window.cs = stayService


function query(filterBy) {
    return storageService.query(STORAGE_KEY)
}
function getById(stayId) {
    return storageService.get(STORAGE_KEY, stayId)
    // return axios.get(`/api/stay/${stayId}`)
}
async function remove(stayId) {
    await storageService.remove(STORAGE_KEY, stayId)
    stayChannel.postMessage(getActionRemoveStay(stayId))
}
async function save(stay) {
    var savedStay
    if (stay._id) {
        savedStay = await storageService.put(STORAGE_KEY, stay)
        stayChannel.postMessage(getActionUpdateStay(savedStay))
        
    } else {
        // Later, owner is set by the backend
        stay.owner = userService.getLoggedinUser()
        savedStay = await storageService.post(STORAGE_KEY, stay)
        stayChannel.postMessage(getActionAddStay(savedStay))
    }
    return savedStay
}

function getEmptyStay() {
    return {
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}


// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))
