import axios from 'axios'

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:3030/api/'

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
})

instance.interceptors.request.use(config => {
  // Add common headers here
  return config
})

instance.interceptors.response.use(response => {
  // Handle common response scenarios here
  return response
}, error => {
  console.error(`Request failed with status ${error.response.status}: ${error.response.data.message}`)
  throw error
})

export const httpService = {
  async get(endpoint, data) {
    const response = await instance.get(endpoint, { params: data })
    return response.data
  },
  async post(endpoint, data) {
    const response = await instance.post(endpoint, data)
    return response.data
  },
  async put(endpoint, data) {
    const response = await instance.put(endpoint, data)
    return response.data
  },
  async delete(endpoint, data) {
    const response = await instance.delete(endpoint, { data })
    return response.data
  }
}