const INITIAL_STATE = {
    isLoading: false,
    stays: [],
    wishList: [],
    sortBy: { price: 1 },
    filterBy: {
        pageIdx: 0,
        txt: '',
        region: '',
        labels: [],
        amenities: [],
        placeTypes: [], //'Entire home/apt', 'Private room', 'Shared room'
        propertyTypes: [], // 'Apartment', 'Guesthouse', 'Hotel', 'House'
        rateRange: [0, 5],
        priceRange: [0, Infinity],
        capacityRange: [0, Infinity],
        dateRange: [
            new Date(),
            new Date(new Date().setDate(new Date().getDate() + 3))
        ],
    }
}

export function stayReducer(state = INITIAL_STATE, action) {
    var newState = state
    switch (action.type) {
        /* CRUD */
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

        /* sort */
        case 'SET_SORT_BY':
            newState = { ...state, sortBy: { ...action.sortBy } }
            break

        /* filter */
        case 'SET_FILTER_BY':
            newState = { ...state, filterBy: { ...action.filterBy } }
            break

        /* wishlist */
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

        /* page-idx */
        case 'INC_PAGE_IDX':
            newState = { ...state, pageIdx: action.pageIdx + 1 }
            break

        case 'DEC_PAGE_IDX':
            newState = { ...state, pageIdx: action.pageIdx - 1 }
            break

        case 'SET_PAGE_IDX':
            newState = { ...state, pageIdx: action.pageIdx }
            break
        default:
    }
    window.stateStay = newState // debug
    console.log(action)
    return newState
}