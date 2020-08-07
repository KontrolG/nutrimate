import { combineReducers } from "redux";
import {
  SET_SEARCH_QUERY,
  TOGGLE_SEARCH_IS_CLOSED,
  SET_SEARCH_IS_CLOSED
} from "../actions/types";

const query = (previousState = "", action) => {
  if (action.type === SET_SEARCH_QUERY) {
    return action.query; // retorna el nuevo valor de la parte del estado que le toca.
  }
  return previousState; // Necesario para saber que parte del estado manejara este reducer cuando es iniciado el store.
};

const isClosed = (previousState = true, action) => {
  if (action.type === TOGGLE_SEARCH_IS_CLOSED) {
    return !previousState;
  }
  if (action.type === SET_SEARCH_IS_CLOSED) {
    return action.isClosed;
  }
  return previousState;
};

const searchReducer = combineReducers({
  isClosed,
  query
});

export default searchReducer;
