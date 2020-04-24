import { elements, $, elementsStrings, removeSelector } from "./base";

const newNutrientsNames = {
  "Total lipid (fat)": "Fat",
  "Carbohydrate, by difference": "Carbs",
  "Fiber, total dietary": "Fiber"
};

const createNutrientAmount = ( {name, amount, unitName} ) => `<span class="nutrient__amount" data-nutrient-name="${name}">${amount}</span> ${unitName}`;

const createMacroDefinition = (macro) => `
  <dt>${newNutrientsNames[macro.name] || macro.name}</dt>
  <dd>${createNutrientAmount(macro)}</dd>`;

/* Nested row??? */
const createNutritionFactRow = (nutrient) => `
  <tr>
    <td>${nutrient.name}</td>
    <td>${createNutrientAmount(nutrient)}</td>
  </tr>`;

const createPortionOption = ({gramWeight, portionDescription, amount, name}, portionIndex) => `
  <option data-portion-index="${portionIndex}" value="${gramWeight}">
    ${portionDescription || (amount + " " + name)} - ${gramWeight} g
  </option>`; 

const createFragmentOfElements = (elements, createFunction) =>
  elements.map(createFunction).join("");

const createFoodFigure = ({ description, portions, nutrients }) => {
  const [, calories, protein, fat, carbs, fiber] = nutrients;
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
                [protein, carbs, fat, fiber],
                createMacroDefinition
              )}
          </dl>
        </form>
          <div class="food__balance">
            <h4 class="food__balance__title">Calories balance</h4>
            <ul class="food__balance__values">
              <li class="${removeSelector(elementsStrings.balanceValuesNow)}">
                <span class="progress"></span>
              </li>
              <li class="bar">
                <p class="bar__title">
                  now
                </p>
                <span class="bar__body"></span>
              </li>
              <li class="${removeSelector(elementsStrings.balanceValuesFood)}">
                <span class="progress"></span>
              </li>
              <li class="bar">
                <p class="bar__title bar__remaining">
                  remaining
                </p>
                <span class="bar__body"></span>
              </li>
              <li class="${removeSelector(
                elementsStrings.balanceValuesRemaining
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
              ${createFragmentOfElements(
                nutrients,
                createNutritionFactRow
              )}
            </tbody>
            <tfoot class="food__nutrients__source">
              <tr>
                <td colspan="2">
                  U.S. Department of Agriculture, Agricultural Research Service. FoodData Central, 2019. <a
                    href="http://fdc.nal.usda.gov" >fdc.nal.usda.gov.</a>
                </td>
              </tr>
            </tfoot>
          </table>
        </figcaption>
      </figure>`;
};
export const renderFood = (food) => {
         const markup = createFoodFigure(food);
         elements.foodSection.insertAdjacentHTML("afterBegin", markup);
       };

export const changeCaloriesBalanceValues = ({currentTotal, calories,remaining, caloriesGoal}) => {
  const modulus = caloriesGoal / 100;
  $(elementsStrings.balanceValuesNow).style.flexBasis = `${currentTotal /    modulus}%`;
  $(elementsStrings.balanceValuesFood).style.flexBasis = `${calories /    modulus}%`;
  $(elementsStrings.balanceValuesRemaining).style.flexBasis = `${remaining / modulus}%`;
};

export const clearFood = () => {
  const element = $(elementsStrings.foodFigure);
  if (element) element.parentNode.removeChild(element);
};

export const getQuantity = () => $(elementsStrings.quantityInput).value;

export const getPortionIndex = () => {
  const selectedOption = $(elementsStrings.portionSelect).selectedOptions[0];
  return selectedOption.dataset.portionIndex;
};

export const changeNutrientsAmounts = nutrients => {
  nutrients.forEach(({name, amount}) => {
    let amountElements = $(`${elementsStrings.foodFigure} .nutrient__amount[data-nutrient-name="${name}"]`
    );
    if (!amountElements.length) amountElements = [amountElements];

    [...amountElements].forEach(element => (element.textContent = amount));
  })
};