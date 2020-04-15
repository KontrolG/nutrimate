import * as searchView from "./views/searchView";
import Search from "./models/Search";
import { elements, toggleCentered, hide, show, debounce } from "./views/base";

const state = {
  lastScroll: 0
};

const renderResults = results => {
  results.forEach(searchView.renderResult);
  toggleCentered(elements.resultsLoader);
  hide(elements.resultsLoader);  
}

const searchResults = async query => {
  if (!state.search) state.search = new Search(query);
  return await state.search.fetchResults();
};

const getResults = async query => {
  searchView.removeResultsNotSearchedClass();
  show(elements.resultsLoader);
  const newResults = await searchResults(query);
  if (newResults.length) renderResults(newResults);
  else alert("No results found");
}

const clearResults = () => {
  state.search = null;
  searchView.clearResultsList();
  searchView.addResultsNotSearchedClass();
  toggleCentered(elements.resultsLoader, true);
};

const searchFormSubmitController = async e => {
  e.preventDefault();
  const query = searchView.getInput();
  if (!query) {
    alert("Maneja cuando la query esta vacia");
    return;
  }
  searchView.blurSearchInput();
  if (state.search) clearResults();
  await getResults(query);
}

const deleteSearch = () => {
  clearResults();
  searchView.clearInput();
  searchView.toggleSearchFilledClass(false);
  searchView.closeSearch();
}

const activeSearch = () => {
  searchView.openSearch();
  searchView.focusSearchInput();
}

const toggleSearch = e => {
  searchView.searchIsClosed() ? activeSearch() : deleteSearch();
};

const searchInputController = e => {
  const isFilled = searchView.getInput() !== "";
  searchView.toggleSearchFilledClass(isFilled);  
};

const searchFormResetController = e => {
  searchView.focusSearchInput();
  searchView.toggleSearchFilledClass(false);
}

const handleScroll = async e => {
  const { scrollTop, offsetHeight } = e.target;
  const scrollingToBottom = scrollTop > state.lastScroll;
  const loaderBottomEdgePosition = (elements.resultsList.offsetHeight - offsetHeight) + elements.resultsLoader.offsetHeight;
  if (scrollingToBottom && scrollTop >= loaderBottomEdgePosition) {
    await getResults();
  }
  state.lastScroll = scrollTop;
};

window.state = state;

elements.searchBtn.addEventListener("click", toggleSearch);
elements.searchForm.addEventListener("submit", searchFormSubmitController);
elements.searchForm.addEventListener("reset", searchFormResetController);
elements.searchInput.addEventListener("input", searchInputController);
elements.resultsSection.addEventListener("scroll", debounce(handleScroll, 50, false));

/* 
786559,"survey_fndds_food","Orange, raw","","2020-04-01"

*/