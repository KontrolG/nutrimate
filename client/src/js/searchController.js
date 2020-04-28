import * as searchView from "./views/searchView";
import Search from "./models/Search";
import { elements, toggleCentered, hide, show, debounce } from "./views/base";
import { changeSection } from "./views/navigationView";

/* Formulario */

/* DELEGAR CARGA A LA VISTA, ESTAS FUNCIONES TIENEN POCO QUE VER CON OTRAS PARTES (CONTROLADOR, MODEL) */

const activeSearch = () => {
  searchView.openSearch();
  searchView.focusSearchInput();
}

const toggleSearch = event => {
  searchView.searchIsClosed() ? activeSearch() : deleteSearch();
};

const handleInput = event => {
  const isFilled = searchView.getInput() !== "";
  searchView.toggleSearchFilledClass(isFilled);  
};

const handleReset = event => {
  searchView.focusSearchInput();
  searchView.toggleSearchFilledClass(false);
}

const handleScroll = async event => {
  const { scrollTop, offsetHeight } = e.target;
  const scrollingToBottom = scrollTop > globals.state.lastScroll;
  const loaderBottomEdgePosition = (elements.resultsList.offsetHeight - offsetHeight) + elements.resultsLoader.offsetHeight;
  if (scrollingToBottom && scrollTop >= loaderBottomEdgePosition) {
    await getResults();
  }
  globals.state.lastScroll = scrollTop;
};

elements.searchBtn.addEventListener("click", toggleSearch);
elements.searchInput.addEventListener("input", handleInput);
elements.searchForm.addEventListener("reset", handleReset);
/* elements.searchForm.addEventListener("submit", handleSubmit); */
elements.resultsSection.addEventListener("scroll", debounce(handleScroll, 50, false));