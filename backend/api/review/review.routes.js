const express = require('express')
const {requireAuth} = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { addReview, getReviews, deleteReview } = require('./review.controller')

const router = express.Router()

router.get('/', log, getReviews)
router.post('/', log, addReview)
router.delete('/:id', requireAuth, deleteReview)

module.exports = router