import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { mainReducer } from "./reducers/mainReducer";

const reducer = combineReducers({
  collections: mainReducer,
});

const enhanceComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, enhanceComposer(applyMiddleware(thunk)));
export default store;
