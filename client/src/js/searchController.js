import * as searchView from "./views/searchView";
import Search from "./models/Search";
import { elements, removeHighlight, debounce } from "./views/base";

const state = {
  lastScroll: 0
};

const searchResults = async query => {
  if (!state.search) state.search = new Search(query);
  return await state.search.fetchResults();
}

const renderResults = results => {
  /* IF: no hay resultados */
  results.forEach(searchView.renderResult);
  searchView.addResultsFoundClass();
}

const getResults = async query => {
  const newResults = await searchResults(query);
  renderResults(newResults);
}

const searchFormController = async e => {
  e.preventDefault();
  const query = searchView.getInput();
  if (!query) {
    alert("Maneja cuando la query esta vacia");
    return;
  }
  if (state.search) clearResults();
  await getResults(query);
}

const clearResults = e => {
  state.search = null;
  searchView.clearInput();
  searchView.clearResultsList();
  searchView.removeResultsFoundClass();
};

const getMoreResults = () => {

}

const handleScroll = async e => {
  const {scrollTop, offsetHeight} = e.target;
  const scrollingToBottom = scrollTop > state.lastScroll; 
  const loaderPosition = elements.resultsList.offsetHeight - offsetHeight;
  if (scrollingToBottom && scrollTop >= loaderPosition) {
    console.log(scrollingToBottom);
    await getResults();    
  }
  state.lastScroll = scrollTop;
}

window.state = state;
getResults("A");


elements.searchForm.addEventListener("submit", searchFormController);
elements.resultsClearBtn.addEventListener("click", clearResults);
elements.resultsSection.addEventListener("scroll", debounce(handleScroll));

/* 
function scrollController(e) {
  const newPositionY = this.pageYOffset || this.scrollY;
  const {y: paginationPositionY, height} = elements.pagination.getBoundingClientRect();
  const direction = newPositionY > state.lastPositionY ? "down" : "up";
  const elementReached = paginationPositionY + height < window.innerHeight;

  if (direction === "down" && elementReached && !state.fetchingPosts) {
    state.fetchingPosts = true;
    toggleLoader();
    setTimeout(loadMorePosts, 1000);
  }
  state.lastPositionY = newPositionY;
}

function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const debouncedFunction = debounce(scrollController, 20, false); */

/* elements.searchInput.addEventListener("focus", hideLogo); */
/* const toggleSearch = () => {
  removeHighlight(elements.searchBtn);
  searchView.searchIsClosed()
    ? searchView.openSearch()
    : searchView.closeSearch();
};

elements.searchBtn.addEventListener("click",toggleSearch); */