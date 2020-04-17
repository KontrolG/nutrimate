import * as searchView from "./views/searchView";
import Search from "./models/Search";
import { elements, toggleCentered, hide, show, debounce } from "./views/base";

const renderResults = results => {
  results.forEach(searchView.renderResult);
  toggleCentered(elements.resultsLoader);
  hide(elements.resultsLoader);  
}

const searchResults = async query => {
  if (!globals.state.search) globals.state.search = new Search(query);
  return await globals.state.search.fetchResults();
};

const getResults = async query => {
  searchView.removeResultsNotSearchedClass();
  show(elements.resultsLoader);
  const newResults = await searchResults(query);
  if (newResults.length) renderResults(newResults);
  else alert("No results found");
}

const clearResults = () => {
  globals.state.search = null;
  searchView.clearResultsList();
  searchView.addResultsNotSearchedClass();
  toggleCentered(elements.resultsLoader, true);
};

const handleSubmit = async e => {
  e.preventDefault();
  const query = searchView.getInput();
  if (!query) {
    alert("Maneja cuando la query esta vacia");
    return;
  }
  searchView.blurSearchInput();
  if (globals.state.search) clearResults();
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

const handleInput = e => {
  const isFilled = searchView.getInput() !== "";
  searchView.toggleSearchFilledClass(isFilled);  
};

const handleReset = e => {
  searchView.focusSearchInput();
  searchView.toggleSearchFilledClass(false);
}

const handleScroll = async e => {
  const { scrollTop, offsetHeight } = e.target;
  const scrollingToBottom = scrollTop > globals.state.lastScroll;
  const loaderBottomEdgePosition = (elements.resultsList.offsetHeight - offsetHeight) + elements.resultsLoader.offsetHeight;
  if (scrollingToBottom && scrollTop >= loaderBottomEdgePosition) {
    await getResults();
  }
  globals.state.lastScroll = scrollTop;
};

window.state = globals.state;

elements.searchBtn.addEventListener("click", toggleSearch);
elements.searchForm.addEventListener("submit", handleSubmit);
elements.searchForm.addEventListener("reset", handleReset);
elements.searchInput.addEventListener("input", handleInput);
elements.resultsSection.addEventListener("scroll", debounce(handleScroll, 50, false));