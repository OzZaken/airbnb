const authService = require('./auth.service')
const logger = require('../../services/logger.service')

module.exports = {
    login,
    signup,
    logout
}

/** Authenticates a user's login request,
 *  Generates a login token
 *  Sends it back to the client along with the user object if authentication is successful.
 *  Otherwise, it sends an error message to the client. */
async function login(req, res) {
    const { username, password } = req.body
    try {
        const user = await authService.login(username, password)
        const loginToken = authService.getLoginToken(user)
        logger.info('User login: ', user)

        res.cookie('loginToken', loginToken, { sameSite: 'None', secure: true })
        res.json(user)
    } catch (err) {
        logger.error('Failed to Login ' + err)
        res.status(401).send({ err: 'Failed to Login' })
    }
}

/** Creates a new user account,
 *  Authenticates the user
 *  Generates a login token
 *  Sends it back to the client along with the user object.
 *  If any errors occur during these processes, it sends an error message to the client. */
async function signup(req, res) {
    try {
        const credentials = req.body
        const account = await authService.signup(credentials)
        logger.debug(`auth.route - new account created: ` + JSON.stringify(account))

        const user = await authService.login(credentials.username, credentials.password)
        logger.info('User signup:', user)

        const loginToken = authService.getLoginToken(user)
        res.cookie('loginToken', loginToken, { sameSite: 'None', secure: true })

        res.json(user)
    } catch (err) {
        logger.error('Failed to signup ' + err)
        res.status(500).send({ err: 'Failed to signup' })
    }
}

/** Clears the login token cookie and sends a success message to the client.
 *  If there is an error clearing the cookie and sends an error message to the client. */
async function logout(req, res) {
    try {
        res.clearCookie('loginToken')
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to logout' })
    }
}