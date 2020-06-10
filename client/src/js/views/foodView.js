import { $, elements, elementsStrings, fixDecimals, toggleHideShow, isHidden } from "./base";
import createFoodFigure from "./components/foodFigure";

export const renderFood = food => {
  const markup = createFoodFigure(food);
  elements.foodSection.insertAdjacentHTML("afterBegin", markup);
};

export const changeCaloriesBalanceValues = balanceValues => {
  Object.entries(balanceValues)
        .forEach(changePercentage);
};

const changePercentage = ([elementName, percentage]) => {
  const elementSelector = elementsStrings.balanceValues[elementName];
  const balanceValueElement = $(elementSelector);
  balanceValueElement.style.flexBasis = `${percentage}%`;
};

export const clearFood = () => {
  const element = $(elementsStrings.foodFigure);
  if (element) element.parentNode.removeChild(element);
};

export const getQuantity = () => $(elementsStrings.quantityInput).value;

export const getPortionIndex = () => {
  const portionSelect = $(elementsStrings.portionSelect);
  const { selectedIndex } = portionSelect;
  const selectedOption = portionSelect.options[selectedIndex];
  return selectedOption.dataset.portionIndex;
};

export const changeNutrients = nutrients => {
  nutrients.forEach(changeAmount);
};

const changeAmount = ({ name, amount }) => {
  const selector = `${elementsStrings.foodFigure} .nutrient__amount[data-nutrient-name="${name}"]`;
  const amountElements = document.querySelectorAll(selector);
  const fixedAmount = fixDecimals(amount);
  Array.from(amountElements).forEach(
    element => (element.textContent = fixedAmount)
  );
};

export const isQuantityInput = target =>
  target.matches(elementsStrings.quantityInput);

export const isPortionSelect = target =>
  target.matches(elementsStrings.portionSelect);

export const toggleAddPopup = () => toggleHideShow(elements.foodAddPopup);

export const addPopupIsClose = () => isHidden(elements.foodAddPopup);

export const addWrapperClicked = target => 
  target.closest(elementsStrings.foodAddWrapper) !== null;