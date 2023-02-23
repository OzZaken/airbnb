import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'

import { userReducer } from './reducers/user.reducer'
import { stayReducer } from './reducers/stay.reducer'
import { appReducer } from './reducers/app.reducer'
// import { orderReducer } from './reducers/order.reducer'

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