const renderResults = results => {
  results.forEach(searchView.renderResult);
  toggleCentered(elements.resultsLoader);
  hide(elements.resultsLoader);
};

const searchResults = async query => {
  if (!globals.state.search) globals.state.search = new Search(query);
  return await globals.state.search.fetchResults();
};

const getResults = async query => {
  searchView.removeResultsNotSearchedClass();
  show(elements.resultsLoader);
  try {
    const newResults = await searchResults(query);
    if (newResults.length) renderResults(newResults);
    else alert("No results found");
  } catch (error) {
    alert("Error searching!");
  }
};

const clearResults = () => {
  // delete globals.state.search
  globals.state.search = null;
  searchView.clearResultsList();
  searchView.addResultsNotSearchedClass();
  toggleCentered(elements.resultsLoader, true);
};

const handleSubmit = async e => {
  e.preventDefault();
  changeSection("resultsSection");
  const query = searchView.getInput();
  if (!query) {
    alert("Maneja cuando la query esta vacia");
    return;
  }
  searchView.blurSearchInput();
  if (globals.state.search) clearResults();
  await getResults(query);
};

const deleteSearch = () => {
  clearResults();
  changeSection("resultsSection");
  searchView.clearInput();
  searchView.toggleSearchFilledClass(false);
  searchView.closeSearch();
};
