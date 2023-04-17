const config = process.env.NODE_ENV === 'production' ? require('./prod') : require('./dev')

module.exports = config
// const colors = require('colors')

// keys.js - figure out what set of credentials to return


// var config

// in production - return the prod set of keys
// if (process.env.NODE_ENV === 'production') config = require('./prod')

// in development - return the dev keys!!!
// else {
//     config = require('./dev')

//     console.log('Enjoy development ✨'.rainbow)
//     console.log('Let creativity flow, code will follow.'.bold)
// }