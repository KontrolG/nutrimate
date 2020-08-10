import React from "react";
import FoodTotalCalories from "./FoodTotalCalories";
import FoodQuantityForm from "./FoodQuantityForm";
import MacrosList from "../../../MacrosList";

const SummarySection = props => {
  return (
    <section className="food__summary">
      <FoodTotalCalories />
      <FoodQuantityForm />
      <MacrosList
        className="food__macros"
        macros={[
          { name: "Fiber", amount: 77.631, unitName: "g" },
          { name: "Protein", amount: 2.49165, unitName: "g" },
          {
            name: "Carbohydrate, by difference",
            amount: 5.0511,
            unitName: "g"
          },
          { name: "Total lipid (fat)", amount: 5.7969, unitName: "g" }
        ]}
      />
    </section>
  );
};

export default SummarySection;
