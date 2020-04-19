import { elements, fixDecimals, $, elementsStrings } from "./base";

export const renderFood = ({displayName, calories}) => {
  const markup = `
      <figure class="food__fig">
        <img src="img/test-food.jpg" alt="">
        <figcaption class="food__info rounded__box">
          <h3 class="food_name">
            ${displayName} <p class="food__calories calories"><strong>${fixDecimals(calories, 0)}</strong> kcal</p>
          </h3>
          <div class="food__balance">
            <h4 class="food__balance__title">Calories balance</h4>
            <ul class="food__balance__values">
              <li class="values__now">
                <span class="progress"></span>
              </li>
              <li class="bar">
                <p class="bar__title">
                  now
                </p>
                <span class="bar__body"></span>
              </li>
              <li class="values__food">
                <span class="progress"></span>
              </li>
              <li class="bar">
                <p class="bar__title">
                  remaining
                </p>
                <span class="bar__body"></span>
              </li>
              <li class="values__remaining">
                <span class="progress"></span>
              </li>
            </ul>
          </div>
          <dl class="food__data__list">
            <dt>Carbs</dt>
            <dd><span>16</span> g</dd>
            <dt>Proteins</dt>
            <dd><span>2,5</span> g</dd>
            <dt>Fats</dt>
            <dd><span>3,1</span> g</dd>
          </dl>
        </figcaption>
      </figure>`;
  elements.foodSection.insertAdjacentHTML("afterBegin", markup);
}

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