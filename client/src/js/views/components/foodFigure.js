import { elements, elementsStrings, removeSelector } from "../base";
import {
  createNutrientAmount,
  createFragmentOfElements,
  createQuantityInput,
  createPortionSelect,
  createLabelFor,
  createMacroDefinition,
  createNutritionFactRow
} from "./base";

export default  ({ description, calories, protein, carbohydrate, fat, fiber, portions, nutrients }) => {
  console.log(calories);
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
              ${createQuantityInput()}
              ${createLabelFor("quantityInput", "Quantity")}  
          </span>
          <span class="multiply__sign">&Cross;</span>
          <span class="field__wrapper select__wrapper">
            ${createPortionSelect(portions)}
            ${createLabelFor("portionSelect", "Portion")}  

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