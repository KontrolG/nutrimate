import { elements, $, elementsStrings, removeSelector, fixDecimals, toggleHideShow, isHidden } from "./base";
import { createNutrientAmount, createFragmentOfElements, createMacroDefinition } from "./components";

export const renderFood = food => {
  const markup = createFoodFigure(food);
  elements.foodSection.insertAdjacentHTML("afterBegin", markup);
};

const createFoodFigure = food => {
  const { description, calories, protein, carbohydrate, fat, fiber, portions, nutrients } = food;
  return `
    <figure class="${removeSelector(elementsStrings.foodFigure)}">
      <img src="img/test-food.jpg" alt="${description}">
      <figcaption class="food__info rounded__box">
        <h3 class="food__name">${description}</h3>
        <form class="food__quantity">
          <p class="food__calories calories">${createNutrientAmount(
            calories
          )}</p>
          <span class="field__wrapper input__wrapper">
            <input type="number" class="${removeSelector(
              elementsStrings.quantityInput
            )} form__control" placeholder="Qty" min="1"
                value="1">
              <label for="quantity__input">Quantity</label>  
          </span>
          <span class="multiply__sign">&Cross;</span>
          <span class="field__wrapper select__wrapper">
            <select class="${removeSelector(
              elementsStrings.portionSelect
            )} form__control">
                ${createFragmentOfElements(portions, createPortionOption)}
                <option value="1">
                  1 g
                </option>
            </select>
            <label for="portion__select">Portion</label>
          </span>
          <dl class="food__macros macros__data">
              ${createFragmentOfElements(
                [protein, carbohydrate, fat, fiber],
                createMacroDefinition
              )}
          </dl>
        </form>
          <div class="food__balance">
            <h4 class="food__balance__title">Calories balance</h4>
            <ul class="food__balance__values">
              <li class="${removeSelector(elementsStrings.balanceValues.now)}">
                <span class="progress"></span>
              </li>
              <li class="bar">
                <p class="bar__title">
                  now
                </p>
                <span class="bar__body"></span>
              </li>
              <li class="${removeSelector(elementsStrings.balanceValues.food)}">
                <span class="progress"></span>
              </li>
              <li class="bar">
                <p class="bar__title bar__remaining">
                  remaining
                </p>
                <span class="bar__body"></span>
              </li>
              <li class="${removeSelector(
                elementsStrings.balanceValues.remaining
              )}">
                <span class="progress"></span>
              </li>
            </ul>
          </div>
          <table class="food__nutrients">
            <caption>
              <h4>Nutrition Facts</h4>
            </caption>
            <tbody>
              ${createFragmentOfElements(nutrients, createNutritionFactRow)}
            </tbody>
            <tfoot class="food__nutrients__source">
              <tr>
                <td colspan="2">
                  U.S. Department of Agriculture, Agricultural Research Service. <a
                    href="http://fdc.nal.usda.gov" title="FoodData Central Homepage">FoodData Central</a>, 2019.
                </td>
              </tr>
            </tfoot>
          </table>
        </figcaption>
      </figure>`;
};

/* Nested row??? */
const createNutritionFactRow = nutrient => `
  <tr>
    <td>${nutrient.name}</td>
    <td>${createNutrientAmount(nutrient)}</td>
  </tr>`;

const createPortionOption = ({gramWeight, portionDescription, amount, name}, portionIndex) => `
  <option data-portion-index="${portionIndex}" value="${gramWeight}">
    ${portionDescription || (amount + " " + name)} - ${gramWeight} g
  </option>`;

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