import { elements, $, toggleCentered, hide, show } from "./base";
import createResultItem from "./components/resultItem";
import { createFragmentOfElements, createNutrientAmount, createMacroDefinition } from "./components/base";

export const clearResults = () => {
  elements.resultsList.innerHTML = "";
  showResultsPlaceholder();
  toggleCentered(elements.resultsLoader, true);
};

export const prepareForSearch = () => {
  hideResultsPlaceholder();
  show(elements.resultsLoader);
};

const showResultsPlaceholder = () =>
  elements.resultsSection.classList.add("results__not__searched");

const hideResultsPlaceholder = () =>
  elements.resultsSection.classList.remove("results__not__searched");

export const displayResults = results => {
  renderResults(results)
  toggleCentered(elements.resultsLoader);
  hide(elements.resultsLoader);
};

export const renderResults = results => {
  const markup = createFragmentOfElements(results, createResultItem);
  elements.resultsList.insertAdjacentHTML("beforeEnd", markup);
};

/* const createResultItem = result => {
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
}; */

export const highlightSelected = foodDataCentralID => {
  removeSelected();
  activeSelected(foodDataCentralID);
};

const removeSelected = () => {
  const selectedElement = $(".results__active");
  if (selectedElement) {
    selectedElement.classList.remove("results__active");
  }
};

const activeSelected = foodDataCentralID => {
  const resultElement = elements.resultsList.querySelector(
    `a[href*="#${foodDataCentralID}"] .results__fig`
  );
  if (resultElement) resultElement.classList.add("results__active");
};