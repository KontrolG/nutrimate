import React from "react";
import FoodTotalCalories from "./FoodTotalCalories";
import FoodQuantityForm from "./FoodQuantityForm";
import MacrosList from "../../../MacrosList";

const SummarySection = ({ calories, portions, macros }) => {
  return (
    <section className="food__summary">
      <FoodTotalCalories {...{ calories }} />
      <FoodQuantityForm {...{ portions }} />
      <MacrosList className="food__macros" {...{ macros }} />
    </section>
  );
};

export default SummarySection;
