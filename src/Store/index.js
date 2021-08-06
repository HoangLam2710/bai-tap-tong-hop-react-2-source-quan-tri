import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import user from "./reducers/user";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    user,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;
