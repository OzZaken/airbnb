const express = require('express')
const {
    getOrders,
    getOrderById,
    addOrder,
    updateOrder,
    removeOrder
} = require('./order.controller')
const router = express.Router()


router.get('/', getOrders)
router.get('/:id', getOrderById)
router.post('/', addOrder)
router.put('/:id', updateOrder)
router.delete('/:id', removeOrder)

module.exports = router
