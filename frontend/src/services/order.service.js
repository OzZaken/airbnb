import { httpService } from './http.service.js'

export const orderService = {
    query,
    getById,
    save,
    update,
    remove,
    getUsersByOrders
}

async function query(stayId) {
    const orders = await httpService.get(
        'order',
        { stayId } /* { params: { userId, type } }*/
    )
    return orders
}

async function getUsersByOrders(stayId) {
    const users = await httpService.get('user/orders', { stayId })
    return users
}

async function getById(orderId) {
    const order = await httpService.get(`order/${orderId}`)
    return order
}

function remove(orderId) {
    return httpService.delete(`order/${orderId}`)
}

function save(order) {
    const saveOrder = httpService.post('order', order)
    return saveOrder
}

async function update(order) {
    const UpdateOrder = await httpService.put(`order/${order._id}`, order)
    return UpdateOrder
}
