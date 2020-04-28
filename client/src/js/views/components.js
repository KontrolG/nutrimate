import { fixDecimals } from "./base";

export const newNutrientsNames = {
  "Total lipid (fat)": "Fat",
  "Carbohydrate, by difference": "Carbs",
  "Fiber, total dietary": "Fiber"
};

export const createNutrientAmount = ({ name, amount, unitName }) =>
  `<span class="nutrient__amount" data-nutrient-name="${name}">${fixDecimals(
    amount
  )}</span> ${unitName}`;

export const createMacroDefinition = macro => `
  <dt>${newNutrientsNames[macro.name] || macro.name}</dt>
  <dd>${createNutrientAmount(macro)}</dd>`;

export const createFragmentOfElements = (elements, createFunction) =>
  elements.map(createFunction).join("");
