const colors = require('colors')
// keys.js - figure out what set of credentials to return
var config

// in production - return the prod set of keys
if (process.env.NODE_ENV === 'production') {
    config = require('./prod')
}

// in development - return the dev keys!!!
else {
    console.log('Enjoy development✨\nLet your creativity flow, code will follow.'.rainbow)
    config = require('./dev')
}
module.exports = config