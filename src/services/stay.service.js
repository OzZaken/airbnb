
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
// import { getActionRemoveStay, getActionAddStay, getActionUpdateStay } from '../store/stay.action.js'
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
    // stayChannel.postMessage(getActionRemoveStay(stayId))
}
async function save(stay) {
    var savedStay
    if (stay._id) {
        savedStay = await storageService.put(STORAGE_KEY, stay)
        // stayChannel.postMessage(getActionUpdateStay(savedStay))
        
    } else {
        // Later, owner is set by the backend
        stay.owner = userService.getLoggedinUser()
        savedStay = await storageService.post(STORAGE_KEY, stay)
        // stayChannel.postMessage(getActionAddStay(savedStay))
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

// import { httpService } from './http.service'

// export const stayService = {
//   query,
//   getById,
//   remove,
//   save,
//   avgPricesByType,
// }

// const BASE_URL = `stay/`

// async function query(filterBy = { name: '', minPrice: 0 }) {
//   try {
//     const res = await httpService.get(BASE_URL, filterBy)
//     return res
//   } catch (err) {
//     console.log(`err:`, err)
//   }
// }

// async function getById(stayId) {
//   try {
//     const res = await httpService.get(BASE_URL + stayId)
//     return res
//   } catch (err) {
//     console.log(`err:`, err)
//   }
// }

// async function remove(stayId) {
//   try {
//     const res = await httpService.delete(BASE_URL + stayId)
//     return res
//   } catch (err) {
//     console.log(`err:`, err)
//   }
// }

// async function save(stay) {
//   if (stay._id) {
//     const res = await httpService.put(BASE_URL + stay._id, stay)
//     return res
//   } else {
//     const res = await httpService.post(BASE_URL, stay)
//     return res
//   }
// }

// function avgPricesByType(stays) {
//   const mapType = {}
//   const mapCounterByType = {}
//   stays.map((stay) => {
//     if (!mapType[stay.type]) {
//       mapType[stay.type] = 0
//       mapCounterByType[stay.type] = 0
//     }
//     mapType[stay.type] += stay.price
//     mapCounterByType[stay.type]++
//   })

//   const avgPriceByTypes = []
//   for (const type in mapType) {
//     avgPriceByTypes.push({ [type]: mapType[type] / mapCounterByType[type] })
//   }

//   return avgPriceByTypes
// }