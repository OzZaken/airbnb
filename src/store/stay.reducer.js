const initialState = {
  stays: [],
  filterBy: null,
  sortBy: null,
  isLiked: null,
  page: "/"
}

export function stayReducer(state = initialState, action) {
  var stays
  var filterBy

  switch (action.type) {
    case 'SET_STAYS':
      stays = action.stays.slice()
      return { ...state, stays }

    case 'SET_PAGE': {
      return {
        ...state,
        page: action.page
      }
    }

    case 'ADD_STAY':
      stays = [...state.stays, action.stay]
      return { ...state, stays }

    case 'REMOVE_STAY':
      stays = state.stays.filter((stay) => stay._id !== action.stayId)
      return { ...state, stays }

    case 'UPDATE_STAY':
      stays = state.stays.map((currStay) =>
        currStay._id === action.stay._id ? action.stay : currStay
      )
      console.log(`stays:`, stays)
      return { ...state, stays }

    case 'SET_FILTER_BY':
      // NOT SURE
      filterBy = action.filterBy
      return { ...state, filterBy }

    case 'SET_SORT_BY':
      return { ...state, sortBy: { ...action.sortBy } }

    default:
      return state
  }
}