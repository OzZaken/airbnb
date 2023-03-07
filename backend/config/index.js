var config

// keys.js - figure out what set of credentials to return
if (false && process.env.NODE_ENV === 'production') {
  // in production - return the prod set of keys
  config = require('./prod')
} else {
  // in development - return the dev keys!!!
  config = require('./dev')
}

module.exports = config