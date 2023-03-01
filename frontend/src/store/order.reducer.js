const INITIAL_STATE = {
    orders:[],
    order: {
        price:null,
        guests: 2,
        checkIn: new Date(),
        checkOut: new Date(new Date().getTime() + (3 * 24 * 60 * 60 * 1000)) // Add 3 days to check-in date for first filtering.
    }
}

export function orderReducer(state = INITIAL_STATE, action) {
    var newState = state
    switch (action.type) {
        case 'ADD_ORDER':
            newState = { ...state, orders: [...state.orders, action.order] }
            break

        case 'SET_ORDERS':
            newState = { ...state, orders: action.orders }
            break

        case 'UPDATE_ORDER':
            newState = { ...state, orders: state.orders.map(order => order._id === action.order._id ? action.order : order) }
            break

        case 'REMOVE_ORDER':
            newState = { ...state, orders: state.orders.filter(order => order._id !== action.orderId) }
            break
        default:
    }
    window.gOrderState = newState
    return newState
}