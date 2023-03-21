import { storageService } from './async-storage.service'
// import { httpService } from './http.service'
// import { store } from '../store/store'
// import { getActionSetWatchedUser } from '../store/review.actions'
// import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from './socket.service'
import { showSuccessMsg } from '../services/event-bus.service'

const SESSION_KEY = 'loggedInUser'

export const userService = {
    signup,
    login,
    logout,

    remove,
    update,
    changeExp,
    
    getById,
    getUsers,
    getLoggedInUser,
    saveLocalUser,
}

function getLoggedInUser() {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY)) || null
}

async function login(userCred) {
    const users = await storageService.query('user')
    // const user = await httpService.post('auth/login', userCred)

    const user = users.find(user => user.username === userCred.username)
    if (user) {
        // socketService.login(user._id)
        return saveLocalUser(user)
    }
}

async function signup(userCred) {
    // userCred.score = 10000
    const user = await storageService.post('user', userCred)
    // const user = await httpService.post('auth/signup', userCred)
    // socketService.login(user._id)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(SESSION_KEY)
    // socketService.logout()
    // return await httpService.post('auth/logout')
    return await storageService.post('auth/logout')
}

function getUsers() {
    return storageService.query('user')
    // return httpService.get(`user`)
}

async function getById(userId) {
    const user = await storageService.get('user', userId)
    // const user = await httpService.get(`user/${userId}`)

    // socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
    // socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
    // socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
    return user
}

function onUserUpdate(user) {
    showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
    // store.dispatch(getActionSetWatchedUser(user))
}

function remove(userId) {
    return storageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`)
}

async function update(user) {
    await storageService.put('user', user)
    // user = await httpService.put(`user/${user._id}`, user)

    // Handle case in which admin updates other user's details
    if (getLoggedInUser()._id === user._id) saveLocalUser(user)
    return user
}

async function changeExp(by) {
    const user = getLoggedInUser()
    if (!user) throw new Error('Not loggedin')
    user.score = user.score + by || by
    await update(user)
    return user.score
}

function saveLocalUser(user) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user))
    return user
}


window.userService = userService // debug
// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'user1', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov 2', username: 'admin 2', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()