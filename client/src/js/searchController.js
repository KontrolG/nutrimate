import * as searchView from "./views/searchView";
import * as headerView from "./views/headerView";
import Search from "./models/Search";
import { elements, debounce } from "./views/base";
import { changeCurrentSectionTo } from "./views/navigationView";

const toggleSearch = event => {
  if (headerView.searchIsClosed()) {
    headerView.openSearch();
  } else {
    if (globals.state.search) deleteSearch();
    headerView.closeSearch();
  }
};

const deleteSearch = () => {
  delete globals.state.search;
  searchView.clearResults();
  changeCurrentSectionTo("resultsSection"); /*  ¿CORRECTO?  */
};

const handleSubmit = event => {
  event.preventDefault();
  changeCurrentSectionTo("resultsSection");
  const searchQuery = headerView.getInputValue();
  headerView.blurSearchInput();
  if (globals.state.search) deleteSearch();
  searchResults(searchQuery);
};

const searchResults = async searchQuery => {
  searchView.prepareForSearch();
  try {
    // MEJORAR FUNCION
    await loadResults(searchQuery);
  } catch (error) {
    alert("Error searching!", error);
  }
};

const loadResults = async searchQuery => {
  const results = await getResults(searchQuery);
  // O areThereResults?????
  const thereAreResults = results.length > 0;
  if (thereAreResults) {
    searchView.displayResults(results);
  } else {
    showNotResultsFoundMessage();
  }
};

const getResults = async searchQuery => {
  // ¿IF REDUNDANTE? QUE PASA SI YA HAY UNA BUSQUEDA? <- para cargar mas resultados.
  if (!globals.state.search) 
    globals.state.search = new Search(searchQuery);
  return await globals.state.search.fetchResults();
};

const showNotResultsFoundMessage = () => alert("No results found");

const handleScroll = event => {
  const { scrollTop, offsetHeight } = event.target;
  const isScrollingToBottom = scrollTop > globals.state.lastScroll;
  const loaderBottomEdgePosition = 
  (elements.resultsList.offsetHeight - offsetHeight) + 
  elements.resultsLoader.offsetHeight;
  const isBottomEdgeReached = scrollTop >= loaderBottomEdgePosition;
  globals.state.lastScroll = scrollTop;
  if (isScrollingToBottom && isBottomEdgeReached) {
    searchResults();
  }
};

elements.searchBtn.addEventListener("click", toggleSearch);

elements.searchInput.addEventListener(
  "input", headerView.toggleResetButton
);

elements.searchForm.addEventListener(
  "reset", headerView.resetSearchForm
);

elements.searchForm.addEventListener("submit", handleSubmit);

elements.resultsSection.addEventListener(
  "scroll", debounce(handleScroll, 50, false)
);