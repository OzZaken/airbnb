import { userService } from '../services/user.service.js'

const initialState = {
    user: userService.getLoggedInUser(),
    users: [],
    watchedUser: null,
    filterBy: {
        txt: '',
        minExp: Infinity,
        maxExp: 0,
    },
}

export function userReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        /* CRUD */
        case 'ADD_USER':
            newState = { ...state, users: [...state.users, action.user] }
            break

        case 'SET_USER':
            newState = { ...state, user: action.user }
            break

        case 'SET_USERS':
            newState = { ...state, users: action.users }
            break

        case 'REMOVE_USER':
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break

        /* EXP */
        case 'INCREMENT_USER_EXP':
            newState = { ...state, exp: { ...state, exp: state.exp + 1 } }
            break

        case 'DECREMENT_USER_EXP':
            newState = { ...state, exp: { ...state, exp: state.exp + 1 } }
            break

        case 'CHANGE_USER_EXP':
            newState = { ...state, exp: state.exp + action.exp }
            break

        /* WATCHED_USER */
        case 'SET_WATCHED_USER':
            newState = { ...state, watchedUser: action.user }
            break
        default:
    }
    window.gDebugUserState = newState  //  ← debug: 
    // console.log(`%c ~ UserState Changed By ${action.type}\n: ${JSON.stringify(action,null,0)}`, 'color: grey;')
    return newState
}