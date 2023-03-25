const Cryptr = require('cryptr')
const cryptr = new Cryptr(process.env.CRYPTR || 'Secret-code-1234')
const logger = require('../../services/logger.service')
const bcrypt = require('bcrypt')
const userService = require('../user/user.service')

module.exports = {
    signup,
    login,
    getLoginToken,
    validateToken
}

/** Creates a new user account by calling the userService.
 * add function with the provided credentials.
 * encrypts the user's password with bcrypt and sets their initial airCoins and experience points (exp).
 *  If any errors occur during the signup process, it sends an error message to the client. */
async function signup({ username, password, firstname, lastname, imgUrl }) {
    const airCoins = 10
    const exp = 0
    
    logger.debug(`auth.service - signup with username: ${username}`)
    if (!username || !password || !firstname || !lastname) return Promise.reject('Missing required signup information')

    const userExist = await userService.getByUsername(username)
    if (userExist) return Promise.reject('Username already taken')

    const hash = await bcrypt.hash(password, airCoins)
    return userService.add({ username, password: hash, firstname, lastname, imgUrl, exp })
}

/** Validates a user's login credentials by calling the userService.
 * getByUsername function to retrieve the user's data
 * then checks if the provided password matches the hashed password stored in the database using bcrypt. If authentication is successful, it returns the user object. Otherwise, it sends an error message to the client. */
async function login(username, password) {
    logger.debug(`auth.service - login with username: ${username}`)

    const user = await userService.getByUsername(username)
    if (!user) return Promise.reject('Invalid username or password')

    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid username or password')

    delete user.password
    user._id = user._id.toString()

    return user
}

/** Encrypts the provided user object and returns the encrypted string which will be used as a session token. */
function getLoginToken(user) {
    return cryptr.encrypt(JSON.stringify(user))
}

/** Decrypts and verifies the provided login token
 *  returning the user object if the token is valid or null if it is not.
 *  If there is an error during token decryption, logs an error message to the console. */
function validateToken(loginToken) {
    try {
        const loggedinUser = cryptr.decrypt(loginToken)
        return JSON.parse(loggedinUser)
    } catch (err) {
        console.log('Invalid login token')
    }
    return null
}

/* debug:
(async ()=>{
    await signup('debugUser1', '111', 'debug1 User1')
    await signup('mumu', '123', 'Mumu Maha')
})()
 */