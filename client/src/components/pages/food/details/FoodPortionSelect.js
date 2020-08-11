import React from "react";
import { v4 as getRandomKey } from "uuid";

const toPortionOption = (
  { gramWeight, portionDescription, amount, name },
  portionIndex
) => {
  const portionName = portionDescription || `${amount} ${name}`;
  return (
    <option
      data-portion-index={portionIndex}
      value={gramWeight}
      key={getRandomKey()}
    >
      {portionName} - {gramWeight} g
    </option>
  );
};

const FoodPortionSelect = ({ portions }) => {
  const portionOptions = portions.map(toPortionOption);

  return (
    <select id="portion__select" className="form__control">
      {portionOptions}
      <option value="1">1 g</option>
    </select>
  );
};

export default FoodPortionSelect;
