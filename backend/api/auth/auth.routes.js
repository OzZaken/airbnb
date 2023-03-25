const express = require('express')
const router = express.Router()
const {login, signup, logout} = require('./auth.controller')

router.post('/login', login)
router.post('/signup', signup)
router.post('/logout', logout)

// Express Router object that handles routes related to authentication.
module.exports = router