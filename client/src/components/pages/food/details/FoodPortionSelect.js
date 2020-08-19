import React from "react";
import toElementsWithMappedProps from "../../../../utils/toElementsWithMappedProps";
import PortionOption from "./PortionOption";

const FoodPortionSelect = ({
  portions,
  portionWeightInGrams,
  setPortionWeightInGrams
}) => {
  const toPortionOption = toElementsWithMappedProps(PortionOption);
  const portionOptions = portions.map(toPortionOption);

  return (
    <select
      id="portion__select"
      className="form__control"
      value={portionWeightInGrams}
      onChange={setPortionWeightInGrams}
    >
      {portionOptions}
      <option value="1">1 g</option>
    </select>
  );
};

export default FoodPortionSelect;
