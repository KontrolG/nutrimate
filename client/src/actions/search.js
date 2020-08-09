import {
  SET_SEARCH_QUERY,
  TOGGLE_SEARCH_IS_CLOSED,
  SET_SEARCH_IS_CLOSED,
  SET_IS_SEARCHING,
  SET_RESULTS,
  ADD_RESULTS,
  SET_LAST_UPDATE
} from "./types";
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

export const setResults = results => {
  return { type: SET_RESULTS, results };
};

export const addResults = results => {
  return { type: ADD_RESULTS, results };
};

export const setLastUpdate = () => {
  const lastUpdate = new Date();
  return { type: SET_LAST_UPDATE, lastUpdate };
};

export const fetchFoods = query => async dispatch => {
  dispatch(setIsSearching(true));
  const foodsResults = await fetchData("api/search", {
    q: query
  });
  dispatch(setIsSearching(false));
  dispatch(setResults(foodsResults));
};

export const fetchMoreFoods = (query, start) => async dispatch => {
  const foodsResults = await fetchData("api/search", {
    q: query,
    start
  });
  dispatch(addResults(foodsResults));
};
