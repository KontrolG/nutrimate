import { elements } from "./base";
import { createFragmentOfElements, createNutrientAmount, createMacroDefinition } from "./components";

export const getInput = () => elements.searchInput.value;
export const clearInput = () => elements.searchInput.value = "";

const createResultItem = result => {
  const { fdcId, description, calories, protein, carbohydrate, fat } = result;
  return `<li>
          <a href="#${fdcId}" title="${description}">
            <figure class="results__fig">
              <img src="img/test-food.JPG" alt="${description}">
              <figcaption class="results__info">
                <h4 class="results__name">${description}</h4>
                <p class="results__calories calories">
                  ${createNutrientAmount(calories)}
                </p>
                <dl class="results__macros macros__data">
                  ${createFragmentOfElements([
                    protein, carbohydrate, fat
                  ], createMacroDefinition
                  )}
                </dl>
              </figcaption>
            </figure>
          </a>
        </li>`;
}

export const renderResult = result => {
  const markup = createResultItem(result);  
  elements.resultsList.insertAdjacentHTML("beforeEnd", markup);
}

export const addResultsNotSearchedClass = () =>
  elements.resultsSection.classList.add("results__not__searched");

export const removeResultsNotSearchedClass = () =>
  elements.resultsSection.classList.remove("results__not__searched");

export const clearResultsList = () => (elements.resultsList.innerHTML = "");

export const resetSearchForm = () => elements.searchForm.reset();

export const searchIsClosed = () =>
  elements.header.classList.contains("search__closed");

export const focusSearchInput = () => elements.searchInput.focus();

export const blurSearchInput = () => elements.searchInput.blur();

export const openSearch = () =>
  elements.header.classList.remove("search__closed");

export const closeSearch = () =>
  elements.header.classList.add("search__closed");

export const toggleSearchFilledClass = isFilled =>
  elements.header.classList.toggle("search__filled", isFilled);

export const highlightSelected = () => {};