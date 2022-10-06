import { orderService } from '../services/order.service.local'

export function setCurrentUrl(page) {
  return (dispatch) => {
      dispatch({ type: 'SET_PAGE', page: page })
  }
}

export function loadOrders() {
  return async (dispatch, getState) => {
    const { filterBy } = getState().orderModule
    try {
      const orders = await orderService.query(filterBy)
      dispatch({ type: 'SET_STAYS', orders })
    } catch (err) {
      console.log(`err:`, err)
    }
  }
}

export function removeOrder(orderId) {
  return async (dispatch) => {
    try {
      await orderService.remove(orderId)
      dispatch({ type: 'REMOVE_STAY', orderId })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function addOrder(order) {
  return async (dispatch) => {
    try {
      const savedOrder = await orderService.save(order)
      dispatch({ type: 'ADD_STAY', order: savedOrder })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function updateOrder(order) {
  return async (dispatch) => {
    try {
      const savedOrder = await orderService.save(order)
      dispatch({ type: 'UPDATE_STAY', order: savedOrder })
    } catch (err) {
      console.log('err:', err)
    }
  }
}
