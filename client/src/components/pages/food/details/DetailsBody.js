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
