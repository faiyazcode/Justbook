import { applyMiddleware, combineReducers, legacy_createStore, compose } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../auth/reducers";
import { airportListReducer } from "../airports/reducers";
import { cartReducer } from "../cart/reducers";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth :authReducer,
    airportsList: airportListReducer,
    cart: cartReducer
})

export const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))