const initialState = {
    view: null, // dispatch on eac View CMP cdn 
    darkMode: false, // By-User
    userActions: [], // track user actions
}

export function appReducer(state = initialState, action = {}) {
    var newState = state
    switch (action.type) {
        case 'UPDATE_VIEW':
            newState = { ...state, view: action.view }
            break

        case 'TOGGLE_DARK_MOOD':
            newState = { ...state, darkMode: !state.darkMode }
            break

        case 'ADD_USER_ACTION':

            newState = { ...state, userActions: [...state.userActions, action.event] }
            break

        case 'CLEAR_USER_ACTIONS':
            newState = { ...state, userActions: [] }
            break

        default: 
    }
    window.gAppState = newState
    return newState
}