const logger = require('../../services/logger.service')
const orderService = require('./order.service')

/** Handle HTTP requests for orders. */
module.exports = {
    getOrders,
    getOrderById,
    addOrder,
    updateOrder,
    removeOrder
}

// Sends all orders to the client as a JSON response.
async function getOrders(req, res) {
    try {
        const orders = await orderService.getOrders()
        res.json(orders)
    } catch (err) {
        logger.error('Failed to get orders', err)
        res.status(500).send({ err: 'Failed to get orders' })
    }
}

// Sends a single order specified by its ID to the client
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

/** Receives a new order in the request body,
 *  Adds it to the database,
 *  Sends the newly added order to the client as a JSON response. */
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

/** Receives an updated order in the request body,
 *  Updates the corresponding order in the database,
 *  Sends the updated order to the client as a JSON response. */
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

/** Receives an order ID in the request URL parameter,
 *  Removes the corresponding order from the database,
 *  Sends the removed order ID to the client as a response. */
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