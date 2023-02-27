const initialState = {
    view: null, // dispatch on eac View CMP cdn 
    isDarkMode: false, // By-User
    userActivity: [], // track user actions
    isLoading: true, 
}

export function appReducer(state = initialState, action = {}) {
    var newState = state
    switch (action.type) {
        case 'UPDATE_VIEW':
            newState = { ...state, view: action.view }
            break

        case 'TOGGLE_DARK_MOOD':
            newState = { ...state, isDarkMode: !state.isDarkMode }
            break

        case 'ADD_USER_ACTION':

            newState = { ...state, userActivity: [...state.userActivity, action.event] }
            break

        case 'CLEAR_USER_ACTIVITY':
            newState = { ...state, userActivity: [] }
            break

            case 'TOGGLE_SYSTEM_LOADING':
                newState = { ...state, isLoading: !action.isLoading }
                break
        default: 
    }
    window.gAppState = newState
    return newState
}