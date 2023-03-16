const INITIAL_STATE = {
    stays: [],
    filterBy: {
        /* boolean */
        isDesc: true, // sortBy = { [prop]: (isDesc) ? -1 : 1 }
        /* num */
        sortBy: 'price',
        page: 3, /* front paging  */
        /* string */
        txt: '',  /* name & summary */
        /* checkBox */
        amenities: [],
        placeType: [],
        /* select */
        destination: 'flexible',/* flexible, new york, middle east, italy, south america ,france */
        /* Range: [x,y] */
        priceRange: [0, Infinity],
        rateRange: [0, Infinity],
        capacityRange: [0, Infinity],
        bookingRange: [
            new Date(),
            /* availability of checkOut in minimum of 3 days */
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
    // console.log(`%c ~ stayState Changed By ${action.type}\n: ${JSON.stringify(action,null,0)}`, 'color: gold;')
    return newState
}