import { combineReducers } from "redux";
import search from "./search";

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

const rootReducer = combineReducers({
  search // La función debe tener el mismo nombre de la propiedad que manejara en el estado.
});

export default rootReducer;
