import React from "react";
import FoodTotalCalories from "./FoodTotalCalories";
import FoodQuantityForm from "./FoodQuantityForm";
import MacrosList from "../../../MacrosList";

const SummarySection = ({
  calories,
  portions,
  macros,
  quantity,
  portionWeightInGrams,
  setPortionWeightInGrams
}) => {
  return (
    <section className="food__summary">
      <FoodTotalCalories {...{ calories }} />
      <FoodQuantityForm
        {...{
          portions,
          quantity,
          portionWeightInGrams,
          setPortionWeightInGrams
        }}
      />
      <MacrosList className="food__macros" {...{ macros }} />
    </section>
  );
};

export default SummarySection;
