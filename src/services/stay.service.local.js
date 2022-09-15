import { storageService } from './async-storage.service.js'

export const stayService = {
  query,
  save,
  remove,
  getById,
}

const STORAGE_KEY = 'stays'

const labels = [
  'On wheels',
  'Box game',
  'Art',
  'Baby',
  'Doll',
  'Puzzle',
  'Outdoor',
]

const gDefaultStays = [
  {
    _id: 't101',
    name: 'Talking Doll',
    price: 123,
    labels: ['Doll', 'Battery Powered', 'Baby'],
    createdAt: 1631031801011,
    inStock: true,
  },
  {
    _id: 't102',
    name: 'Talking Robot',
    price: 20,
    labels: ['Robot', 'Battery Powered'],
    createdAt: 1631031801011,
    inStock: true,
  },
  {
    _id: 't103',
    name: 'Talking Animal',
    price: 100,
    labels: ['Animal', 'Battery Powered'],
    createdAt: 1631031801011,
    inStock: false,
  },
]

function query(filterBy) {
  return storageService.query(STORAGE_KEY).then((stays) => {
    if (!stays || !stays.length) {
      storageService.postMany(STORAGE_KEY, gDefaultStays)
      stays = gDefaultStays
    }

    if (filterBy) {
      const { name, minPrice } = filterBy

      if (name) {
        const regex = new RegExp(name, 'i')
        stays = stays.filter((stay) => regex.test(stay.name))
      }

      if (minPrice) {
        stays = stays.filter((stay) => stay.price >= minPrice)
      }
    }
    return stays
  })
}

function getById(stayId) {
  return storageService.get(STORAGE_KEY, stayId)
}

function remove(stayId) {
  return storageService.remove(STORAGE_KEY, stayId)
}

function save(stay) {
  if (stay._id) {
    return storageService.put(STORAGE_KEY, stay)
  } else {
    stay.inStock = true
    stay.createdAt = Date.now()
    stay.labels = []
    return storageService.post(STORAGE_KEY, stay)
  }
}