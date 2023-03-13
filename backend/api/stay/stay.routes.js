const express = require('express')
const { getStays, getStayById, addStay, updateStay, removeStay } = require('./stay.controller')

const router = express.Router()

router.get('/', getStays)
router.get('/:id', getStayById)
router.post('/', addStay)
router.put('/:id', updateStay)
router.delete('/:id', removeStay)

module.exports = router