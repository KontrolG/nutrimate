import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { setSearchQuery, toggleSearchIsClosed } from "./actions/search";

const store = createStore(rootReducer, {} /* applyMiddleware */);

/* TEST */
const logState = () => console.log(store.getState());
logState();
const unsubscribe = store.subscribe(logState);
// store.dispatch(setSearchQuery("TEst 2"));
// unsubscribe();
// store.dispatch(setSearchQuery("TEst 3"));

export default store;
