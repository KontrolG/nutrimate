import React from "react";
import FoodTotals from "./FoodTotals";
import FoodQuantityForm from "./FoodQuantityForm";
import MacrosList from "../../../MacrosList";

const SummarySection = ({
  calories,
  portions,
  macros,
  quantity,
  portionWeightInGrams,
  totalWeightInGrams,
  setPortionWeightInGrams
}) => {
  return (
    <section className="food__summary">
      <FoodTotals {...{ calories, totalWeightInGrams }} />
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
