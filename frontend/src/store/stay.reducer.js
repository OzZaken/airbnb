const INITIAL_STATE = {
    stays: null,
    filterBy: {
        txt: '',
        minPrice: 0,
        MaxPrice: 0,
        pageIdx: 1,
    },
    favorites: [],
    sortBy: null,
}

export function stayReducer(state = INITIAL_STATE, action) {
    var newState = state
    switch (action.type) {
        case 'ADD_STAY':
            newState = { ...state, stays: [...state.stays, action.stay] }
            break

        case 'SET_STAYS':
            newState = { ...state, stays: action.stays }
            break

        case 'UPDATE_STAY':
            newState = { ...state, stays: state.stays.map(stay => stay._id === action.stay._id ? action.stay : stay) }
            break

        case 'REMOVE_STAY':
            newState = { ...state, stays: state.stays.filter(stay => stay._id !== action.stayId) }
            break

        case 'SET_FILTER_BY':
            newState = { ...state, filterBy: { ...action.filterBy } }
            break

        case 'ADD_TO_FAVORITE':
            newState = { ...state, favorites: [...state.favorites, action.stay] }
            break

        case 'REMOVE_FROM_FAVORITE':
            var favorites = state.favorites.filter(stay => stay._id !== action.stayId)
            newState = { ...state, favorites }
            break

        case 'CLEAR_FAVORITE':
            newState = { ...state, favorites: [] }
            break
        default:
    }
    window.gStayState = newState
    return newState
}