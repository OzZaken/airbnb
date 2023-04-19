const authService = require('../api/auth/auth.service')
const asyncLocalStorage = require('../services/als.service')
/*//* ALS
 * this middleware function sets up a new AsyncLocalStorage instance
 * for each request stores the loggedinUser object in it if the user has been authenticated.
 * makes it possible to access the loggedinUser object from any function within the same async context, without having to pass it around explicitly as a function argument.
 */

async function setupAsyncLocalStorage(req, res, next) {
  const storage = {}

  // passing in storage object as the first argument, and a callback function as the second argument.
  asyncLocalStorage.run(storage, () => {
    
    // If the token is valid, the loggedinUser object is obtained from the token.
    if (!req.cookies) return next()

    // passing in storage as the first argument and a callback function as the second argument.
    const loggedinUser = authService.validateToken(req.cookies.loginToken)

    if (loggedinUser) {
      // retrieve the current async context's AsyncLocalStorage store
      const alsStore = asyncLocalStorage.getStore()

      // save loggedinUser
      alsStore.loggedinUser = loggedinUser
    }
    next()
  })
}

module.exports = setupAsyncLocalStorage