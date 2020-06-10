import { createNutrientAmount, createQuantityInput, createPortionSelect } from "./base";

export default ({ description, calories, quantity, portions }) =>
  `<tr>
    <td>
      X
    </td>
    <td class="foods__ate__name" title="${description}">
      <h4 class="text__with__ellipsis">${description}</h4>
    </td>
    <td class="foods__ate__quantity">
      ${createQuantityInput()}
    </td>
    <td class="foods__ate__portion">
      ${createPortionSelect(portions)}
    </td>
    <td class="foods__ate__calories">
      ${createNutrientAmount(calories)}
    </td>
    <td>
      V
    </td>
  </tr>`;