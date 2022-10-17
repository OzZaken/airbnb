const initialState = {
  stays: [],
  // filterBy: null,
  filterBy: {
    name: '',
    minPrice: 0,
    MaxPrice: 0,
  },
  sortBy: 'popularity',
  isLiked: null,
}

export function stayReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_STAYS':
      return { ...state, stays: action.stays }
    case 'ADD_STAY':
      return { ...state, stays: [...state.stays, action.stay] }
    case 'REMOVE_STAY':
      return { ...state, stays: state.stays.filter(stay => stay._id !== action.stayId) }
    case 'UPDATE_STAY':
      return {
        ...state, stays: state.stays.map(stay =>
          stay._id === action.stay._id ? action.stay : stay)
      }
    case 'SET_FILTER_BY':
      return { ...state, filterBy: { ...action.filterBy } }
    case 'SET_SORT_BY':
      return { ...state, sortBy: { ...action.sortBy } }
    default:
      return state
  }
}