const logger = require('../../services/logger.service')
const orderService = require('./order.service')

// GET LIST
async function getOrders(req, res) {
    try {
        const orders = await orderService.getOrders()
        res.json(orders)
    } catch (err) {
        logger.error('Failed to get orders', err)
        res.status(500).send({ err: 'Failed to get orders' })
    }
}

// GET BY ID
async function getOrderById(req, res) {
    try {
        const orderId = req.params.id
        const order = await orderService.getById(orderId)
        res.json(order)
    } catch (err) {
        logger.error('Failed to get order', err)
        res.status(500).send({ err: 'Failed to get order' })
    }
}

// POST (add stay)
async function addOrder(req, res) {
    try {
        const order = req.body
        const addedOrder = await orderService.add(order)
        res.json(addedOrder)
    } catch (err) {
        logger.error('Failed to add order', err)
        res.status(500).send({ err: 'Failed to add order' })
    }
}

// PUT (Update stay)
async function updateOrder(req, res) {
    try {
        const order = req.body
        const updatedOrder = await orderService.update(order)
        res.json(updatedOrder)
    } catch (err) {
        logger.error('Failed to update order', err)
        res.status(500).send({ err: 'Failed to update order' })
    }
}

// DELETE (Remove Stay)
async function removeOrder(req, res) {
    try {
        const orderId = req.params.id
        const orderRemovedId = await orderService.remove(orderId)
        res.send(orderRemovedId)
    } catch (err) {
        logger.error('Failed to remove stay', err)
        res.status(500).send({ err: 'Failed to remove stay' })
    }
}

module.exports = {
    getOrders,
    getOrderById,
    addOrder,
    updateOrder,
    removeOrder
}
