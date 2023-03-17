const INITIAL_STATE = {
    stays: [],
    wishList: [],
    pageIdx: 0,
    sortBy: { price: 1 },/* Single key obj: {[field] & isDesc ? -1 :1} */
    /* Multi key obj */
    filterBy: {
        txt: '',  /* text: name & summary */
        destination: 'flexible', /* select: flexible | new york | middle east | italy | south | america | france */
        amenities: [],/* checkbox */
        placeType: [], /* select || checkbox: 'entire home/apt', 'private room', 'shared room' */
        propertyType: [], /* checkbox: 'entire home/apt', 'private room', 'shared room' */
        /* num range:  [min, max]*/
        priceRange: [0, Infinity],
        rateRange: [0, Infinity],
        capacityRange: [0, Infinity],
        /* Date range: [checkIn, checkOut] */
        dateRange: [
            new Date(),
            /* checkOut in minimum of 3 days */
            new Date(new Date().setDate(new Date().getDate() + 3))
        ],
    },
}

export function stayReducer(state = INITIAL_STATE, action) {
    var newState = state
    switch (action.type) {
        /* STAY CRUD+L */
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

        /* WISHLIST */
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

        /* PAGE_IDX */
        case 'SET_PAGE_IDX':
            newState = { ...state, pageIdx: action.pageIdx }
            break

        case 'INC_PAGE_IDX':
            newState = { ...state, pageIdx: action.pageIdx + 1 }
            break

        case 'DEC_PAGE_IDX':
            newState = { ...state, pageIdx: action.pageIdx - 1 }
            break

        /* SORT */
        case 'SET_SORT_BY':
            newState = { ...state, sortBy: action.sortBy }
            break

        /* FILTER */
        case 'SET_FILTER_BY':
            newState = { ...state, filterBy: { ...action.filterBy } }
            break
        default:
    }
    window.gStayState = newState
    // console.log(`%c ~ stayState Changed By ${action.type}\n: ${JSON.stringify(action,null,0)}`, 'color: gold;')
    return newState
}