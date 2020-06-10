import { createFragmentOfElements, createNutrientAmount, createMacroDefinition } from "./base";

export default ({ fdcId, description, calories, protein, carbohydrate, fat }) => {
  return `<li>
          <a href="#${fdcId}" title="${description}">
            <figure class="results__fig">
              <img src="img/test-food.JPG" alt="${description}">
              <figcaption class="results__info">
                <h4 class="results__name text__with__ellipsis">${description}</h4>
                <p class="results__calories calories">
                  ${createNutrientAmount(calories)}
                </p>
                <dl class="results__macros macros__data">
                  ${createFragmentOfElements(
                    [protein, carbohydrate, fat],
                    createMacroDefinition
                  )}
                </dl>
              </figcaption>
            </figure>
          </a>
        </li>`;
};