import {
  SET_SEARCH_QUERY,
  TOGGLE_SEARCH_IS_CLOSED,
  SET_SEARCH_IS_CLOSED,
  SET_IS_SEARCHING,
  ADD_RESULTS
} from "./types";
import mockedResults from "./mockedResults";
import { fetchData } from "../utils";

export const setQuery = query => {
  return { type: SET_SEARCH_QUERY, query };
};

export const toggleIsClosed = () => {
  return { type: TOGGLE_SEARCH_IS_CLOSED };
};

export const setIsClosed = isClosed => {
  return { type: SET_SEARCH_IS_CLOSED, isClosed };
};

export const setIsSearching = isSearching => {
  return { type: SET_IS_SEARCHING, isSearching };
};

export const addResults = results => {
  return { type: ADD_RESULTS, results };
};

export const fetchFoods = query => async dispatch => {
  dispatch(setIsSearching(true));
  const foodsResults = await fetchData("api/search", { q: query });
  dispatch(setIsSearching(false));
  dispatch(addResults(foodsResults));
};
