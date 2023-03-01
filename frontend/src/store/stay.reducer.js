const INITIAL_STATE = {
    stays: null,
    filterBy: {
        txt: '', // name , summary
        placeType:'', 
        maxPrice: Infinity,
        minPrice: 0, 
        maxRate: Infinity, 
        minRate: 0,
        minCapacity: 0, 
        amenities: [],
        checkIn: new Date(), 
        pageIdx: 1, // paging
    },
    wishList: [],
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

        case 'ADD_TO_WISHLIST':
            newState = { ...state, wishList: [...state.wishList, action.stay] }
            break

        case 'REMOVE_FROM_WISHLIST':
            var WISHLISTs = state.wishList.filter(stay => stay._id !== action.stayId)
            newState = { ...state, wishList: WISHLISTs }
            break

        case 'CLEAR_WISHLIST':
            newState = { ...state, wishList: [] }
            break
        default:
    }
    window.gStayState = newState
    return newState
}