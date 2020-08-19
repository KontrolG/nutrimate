import React, { Fragment } from "react";
import HeadingSection from "./HeadingSection";
import SummarySection from "./SummarySection";
import BalanceSectionCopy from "./BalanceSection copy";
import BalanceSection from "./BalanceSection";
import NutrientsFactsSection from "./NutrientsFactsSection";

const isMacroNutrient = ({ name }) => {
  const macrosNames = [
    "Fiber, total dietary",
    "Protein",
    "Total lipid (fat)",
    "Carbohydrate, by difference"
  ];
  return macrosNames.includes(name);
};

const isCalories = ({ name, unitName }) =>
  name === "Energy" && unitName === "kcal";

const DetailsBody = ({
  description,
  nutrients,
  portions,
  quantity,
  portionWeightInGrams,
  setPortionWeightInGrams
}) => {
  const totalWeightInGrams = quantity * portionWeightInGrams;
  const macros = nutrients.filter(isMacroNutrient);
  const calories = nutrients.find(isCalories);

  return (
    <Fragment>
      <HeadingSection foodName={description} />
      <SummarySection
        {...{
          calories,
          portions,
          macros,
          quantity,
          portionWeightInGrams,
          totalWeightInGrams,
          setPortionWeightInGrams
        }}
      />
      {/* <BalanceSectionCopy /> */}
      <BalanceSection />
      <NutrientsFactsSection foodNutrients={nutrients} />
    </Fragment>
  );
};

export default DetailsBody;
