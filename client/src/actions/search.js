import {
  SET_SEARCH_QUERY,
  TOGGLE_SEARCH_IS_CLOSED,
  SET_SEARCH_IS_CLOSED
} from "./types";

export const setQuery = query => {
  return { type: SET_SEARCH_QUERY, query };
};

export const toggleIsClosed = () => {
  return { type: TOGGLE_SEARCH_IS_CLOSED };
};

export const setIsClosed = isClosed => {
  return { type: SET_SEARCH_IS_CLOSED, isClosed };
};
