import { elements } from "./base";

export const searchIsClosed = () =>
  elements.header.classList.contains("search__closed");

export const openSearch = () => {
  showSearch();
  focusSearchInput();
};

const showSearch = () => elements.header.classList.remove("search__closed");

const focusSearchInput = () => elements.searchInput.focus();

export const closeSearch = () => {
  clearInput();
  hideResetButton();
  hideSearch();
};

const clearInput = () => (elements.searchInput.value = "");

const hideResetButton = () =>
  elements.header.classList.remove("search__filled");

const hideSearch = () => elements.header.classList.add("search__closed");

/* INPUT */
export const toggleResetButton = () => {
  if (searchIsFilled()) {
    showResetButton();
  } else {
    hideResetButton();
  }
};

const searchIsFilled = () => getInputValue() !== "";

const showResetButton = () => 
  elements.header.classList.add("search__filled");

export const getInputValue = () => elements.searchInput.value;

export const blurSearchInput = () => elements.searchInput.blur();

export const resetSearchForm = () => {
  focusSearchInput();
  hideResetButton();
};
