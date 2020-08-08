import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
const middlewares = [thunk];
const enhancer = compose(
  applyMiddleware(...middlewares),
  window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(rootReducer, initialState, enhancer);

/* TEST */
const logState = () => console.log(store.getState());
logState();
const unsubscribe = store.subscribe(logState);
// store.dispatch(setSearchQuery("TEst 2"));
// unsubscribe();
// store.dispatch(setSearchQuery("TEst 3"));

export default store;
