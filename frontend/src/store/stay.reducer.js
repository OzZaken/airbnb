const INITIAL_STATE = {
    isLoading: false,
    stays: [],
    wishList: [],
    sortBy: { price: 1 },
    filterBy: {
        pageIdx: 0,/* number ~ pagination */
        txt: '',/* string ~  regex  */
        /* string ~ select */
        region: '',
        label: '',
        /* array ~ checkbox */
        amenities: [],
        placeTypes: [],
        propertyTypes: [],
        /* range ~ slider */
        rates: [0, 5],
        prices: [0, Infinity],
        capacities: [0, Infinity],
        bathrooms: [0, Infinity],
        bedrooms: [0, Infinity],
        beds: [0, Infinity],
        /* first shown stays with availability of minimum 3 days. */
        dates: [
            Date.now(),
            Date.now() + 3 * 24 * 60 * 60 * 1000, /*day hour min sec millisecond*/
            new Date(new Date().setDate(new Date().getDate() + 3)),/* debug same value second as Date*/
            new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)/* debug */
        ]
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

        /* Sort */
        case 'SET_SORT_BY':
            newState = { ...state, sortBy: { ...action.sortBy } }
            break

        /* Filter */
        case 'SET_FILTER_BY':
            newState = { ...state, filterBy: { ...action.filterBy } }
            break

        /* Wishlist */
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

        /* Pagination */
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
    console.log(action.type)
    return newState
}

