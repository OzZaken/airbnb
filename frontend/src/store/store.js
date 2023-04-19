import { legacy_createStore as createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'

// import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';

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
    // composeEnhancers enable the use of the Redux DevTools browser extension
    composeEnhancers(applyMiddleware(thunk))
)