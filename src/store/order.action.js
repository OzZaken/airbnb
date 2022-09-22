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

export function setFilterBy(filterBy) {
  return (dispatch) => {
    dispatch({ type: 'SET_FILTER_BY', filterBy })
  }
}

export function sortByOrders(sortBy) {
  return (dispatch, getState) => {
    dispatch({ type: 'SET_SORT_BY', sortBy })

    let { orders } = getState().orderModule

    if (sortBy.sortBy === 'name') {
      orders = orders.sort((t1, t2) => t1.name.localeCompare(t2.name))
    }
    if (sortBy.sortBy === 'price') {
      orders = orders.sort((t1, t2) => t1.price - t2.price)
    }

    dispatch({ type: 'SET_STAYS', orders })
  }
}