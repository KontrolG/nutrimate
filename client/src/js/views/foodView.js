import { elements } from "./base";

export const renderFood = ({displayName}) => {
  const markup = `
      <figure class="food__fig">
        <img src="img/test-food.jpg" alt="">
        <figcaption class="food__info rounded__box">
          <h3 class="food_name">
            ${displayName} <span class="food_portion">200g</span>
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