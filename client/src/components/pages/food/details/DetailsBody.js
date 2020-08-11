import React, { Fragment } from "react";
import HeadingSection from "./HeadingSection";
import SummarySection from "./SummarySection";
import BalanceSectionCopy from "./BalanceSection copy";
import BalanceSection from "./BalanceSection";
import NutrientsFactsSection from "./NutrientsFactsSection";

const DetailsBody = ({ description, nutrients, portions }) => {
  const isMacroNutrient = ({ name }) => {
    const macrosNames = [
      "Fiber, total dietary",
      "Protein",
      "Total lipid (fat)",
      "Carbohydrate, by difference"
    ];
    return macrosNames.includes(name);
  };
  const macros = nutrients.filter(isMacroNutrient);
  const isCalories = ({ name, unitName }) =>
    name === "Energy" && unitName === "kcal";
  const calories = nutrients.find(isCalories);

  return (
    <Fragment>
      <HeadingSection foodName={description} />
      <SummarySection {...{ calories, portions, macros }} />
      {/* <BalanceSectionCopy /> */}
      <BalanceSection />
      <NutrientsFactsSection foodNutrients={nutrients} />
    </Fragment>
  );
};

export default DetailsBody;
