import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'

import { appReducer } from './app.reducer'
import { userReducer } from './user.reducer'
import { stayReducer } from './stay.reducer'
// import { orderReducer } from './order.reducer'

const rootReducer = combineReducers({
    appModule: appReducer,
    stayModule: stayReducer,
    userModule: userReducer,
    // orderModule: orderReducer,
})

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)