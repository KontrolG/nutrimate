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

const toNutrientPerGram = nutrient => {
  const amountPerGram = nutrient.amount / 100;
  return {
    ...nutrient,
    amount: amountPerGram
  };
};

const toMultipliedByTotalWeightInGrams = totalWeightInGrams => nutrient => {
  const totalAmount = nutrient.amount * totalWeightInGrams;
  return {
    ...nutrient,
    amount: totalAmount
  };
};

const DetailsBody = ({
  description,
  nutrients,
  portions,
  quantity,
  portionWeightInGrams,
  setQuantity,
  setPortionWeightInGrams
}) => {
  const totalWeightInGrams = quantity * portionWeightInGrams;
  const calculatedNutrients = nutrients
    .map(toNutrientPerGram)
    .map(toMultipliedByTotalWeightInGrams(totalWeightInGrams));

  const macros = calculatedNutrients.filter(isMacroNutrient);
  const calories = calculatedNutrients.find(isCalories);

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
          setQuantity,
          setPortionWeightInGrams
        }}
      />
      {/* <BalanceSectionCopy /> */}
      <BalanceSection />
      <NutrientsFactsSection foodNutrients={calculatedNutrients} />
    </Fragment>
  );
};

export default DetailsBody;
