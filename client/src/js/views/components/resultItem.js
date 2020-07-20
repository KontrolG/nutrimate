import { createFragmentOfElements, createNutrientAmount, createResultMacroDefinition } from "./base";

export default ({ fdcId, description, calories, portion, protein, carbohydrate, fat }) => {
  return `<li>
          <a class="results__fig" href="#${fdcId}" title="${description}">
            <div class="results__summary">
              <p class="results__calories calories">
                ${createNutrientAmount(calories)}
                <i class="icon-bolt"></i>
              </p>
              <hr />
              <p class="results__portion">
                <i class="icon-plate"></i>
                <span>${portion.gramWeight}</span> g
              </p>
            </div>
            <div class="results__info">
              <h4 class="results__name text__with__ellipsis">${description}</h4>
              <dl class="results__macros macros__data">
                ${createFragmentOfElements(
                  [protein, carbohydrate, fat],
                  createResultMacroDefinition
                )}
              </dl>
            </div>
          </a>
        </li>`;
};