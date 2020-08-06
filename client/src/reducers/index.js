import { SET_SEARCH_QUERY } from "../actions/types";
import { combineReducers } from "redux";

// export const searchQuery = createReducer("", {
//   [SET_SEARCH_QUERY](previousState, action) {
//     const { searchQuery } = action;
//     return { ...previousState, searchQuery };
//   }
// });

// const createReducer = (initialState, handlers) => (
//   state = initialState,
//   action
// ) => {
//   if (handlers.hasOwnProperty(action.type)) {
//     return handlers[action.type](state, action);
//   }
//   return state;
// };

const searchQuery = (state = "", action) => {
  if (action.type === SET_SEARCH_QUERY) {
    return action.searchQuery; // retorna el nuevo valor de la parte del estado que le toca.
  }
  return state; // Necesario para saber que parte del estado manejara este reducer cuando es iniciado el store.
};

const rootReducer = combineReducers({
  searchQuery // La función debe tener el mismo nombre de la propiedad que manejara en el estado.
});

export default rootReducer;
