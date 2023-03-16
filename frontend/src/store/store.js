import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'

/* reducers */
import { systemReducer } from './system.reducer'
import { userReducer } from './user.reducer'
import { stayReducer } from './stay.reducer'
import { orderReducer } from './order.reducer'

/* set root reducer */
const rootReducer = combineReducers({
    systemModule: systemReducer,
    stayModule: stayReducer,
    userModule: userReducer,
    orderModule: orderReducer,
})

/* set compose */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

/* create store */
export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)