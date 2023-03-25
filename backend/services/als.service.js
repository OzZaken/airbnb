const { AsyncLocalStorage } = require('async_hooks')
const asyncLocalStorage = new AsyncLocalStorage()

/** The AsyncLocalStorage singleton
 * set up an AsyncLocalStorage instance and store data related to the logged-in user in it.
*/

module.exports = asyncLocalStorage