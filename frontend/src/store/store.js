import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'

import { systemReducer } from './system.reducer'
import { userReducer } from './user.reducer'
import { stayReducer } from './stay.reducer'
import { orderReducer } from './order.reducer'

const rootReducer = combineReducers({
    systemModule: systemReducer,
    stayModule: stayReducer,
    userModule: userReducer,
    orderModule: orderReducer,
})

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)