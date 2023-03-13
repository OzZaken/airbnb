const INITIAL_STATE = {
    stays: [],
    sortBy: {
        page: 2, /* num ~ front paging  */
        isDesc: true// boolean ~ const sortBy = { [prop]: (isDesc) ? -1 : 1 }
    },
    filterBy: {
        /* txt */
        txt: '',  /* name & summary */
        /* checkBox */
        amenities: [],
        /* select */
        destination: 'flexible',/* flexible, new york, middle east, italy, south america ,france */
        placeType: '',
        /* Range: [x,y] */
        priceRange: [0, Infinity],
        rateRange: [0, Infinity],
        capacityRange: [0, Infinity],
        bookingRange: [
            new Date(),
            new Date(new Date().setDate(new Date().getDate() + 3))
        ],
    },
    wishList: [],
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