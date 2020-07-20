import { elementsStrings, fixDecimals, removeSelector } from "../base";

export const newNutrientsNames = {
  "Total lipid (fat)": "Fat",
  "Carbohydrate, by difference": "Carbs",
  "Fiber, total dietary": "Fiber"
};

export const createNutrientAmount = ({ name, amount, unitName }) =>
  `<span class="nutrient__amount" data-nutrient-name="${name}">${fixDecimals(
    amount
  )}</span> ${unitName}`;

export const createMacroDefinition = macro => {
  if (macro.name) {
    return `<dt>${newNutrientsNames[macro.name] || macro.name}</dt>
            <dd>${createNutrientAmount(macro)}</dd>`; 
  }
};

export const createResultMacroDefinition = macro => {
  if (macro.name) {
    const macroName = newNutrientsNames[macro.name] || macro.name;
    const macroAmount = createNutrientAmount(macro);
    return `<dt>
              <img class="icon" src="img/${macroName}.svg">
              <p data-macro-name="${macroName}">${macroName}</p>
            </dt>
            <dd>${macroAmount}</dd>`; 
  }
};

/* Nested row??? */
export const createNutritionFactRow = nutrient => `
  <tr>
    <td>${nutrient.name}</td>
    <td>${createNutrientAmount(nutrient)}</td>
  </tr>`;

export const createQuantityInput = () => {
  const elementId = removeSelector(elementsStrings.quantityInput);
  return `<input
          type="number"
          id="${elementId}"
          class="form__control"
          placeholder="Qty"
          min="1"
          value="1">`;
};

export const createPortionSelect = portions => {
  const elementId = removeSelector(elementsStrings.portionSelect);
  return `<select 
          id="${elementId}"
          class="form__control">
            ${createFragmentOfElements(portions, createPortionOption)}
            <option value="1">
              1 g
            </option>
          </select>`;
};

const createPortionOption = ({gramWeight, portionDescription, amount, name}, portionIndex) => `
  <option data-portion-index="${portionIndex}" value="${gramWeight}">
    ${portionDescription || (amount + " " + name)} - ${gramWeight} g
  </option>`;

export const createLabelFor = (elementName, label) => {
  const forAtributte = removeSelector(elementsStrings[elementName]);
  return `<label for="${forAtributte}">${label}</label>`;
};

export const createFragmentOfElements = (elements, createFunction) =>
  elements.map(createFunction).join("");
