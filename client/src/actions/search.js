import { SET_SEARCH_QUERY } from "./types";

export const setSearchQuery = searchQuery => {
  return { type: SET_SEARCH_QUERY, searchQuery };
};
