const initialState = {
  order: [],
  sortBy: null,
  isLiked: null,
  page: "/"
}

export function orderReducer(state = initialState, action) {
  var order

  switch (action.type) {
    case 'SET_ORDER':
      order = action.order.slice()
      return { ...state, order }

    case 'SET_PAGE': {
      return {
        ...state,
        page: action.page
      }
    }

    case 'ADD_ORDER':
      order = [...state.order, action.order]
      return { ...state, order }

    case 'REMOVE_ORDER':
      order = state.order.filter((order) => order._id !== action.orderId)
      return { ...state, order }

    case 'UPDATE_ORDER':
      order = state.order.map((currOrder) =>
        currOrder._id === action.order._id ? action.order : currOrder
      )
      console.log(`order:`, order)
      return { ...state, order }

    default:
      return state
  }
}