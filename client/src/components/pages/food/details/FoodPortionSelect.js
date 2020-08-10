import React from "react";

const toPortionOption = (
  { gramWeight, portionDescription, amount, name },
  portionIndex
) => {
  const portionName = portionDescription || `${amount} ${name}`;
  return (
    <option data-portion-index={portionIndex} value={gramWeight}>
      {portionName} - {gramWeight} g
    </option>
  );
};

const FoodPortionSelect = props => {
  const portionOptions = "";
  return (
    <select id="portion__select" className="form__control">
      {portionOptions}
      <option value="1">1 g</option>
    </select>
  );
};

export default FoodPortionSelect;
