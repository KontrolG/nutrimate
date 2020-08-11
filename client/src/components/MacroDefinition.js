import React, { Fragment } from "react";
import NutrientAmount from "./NutrientAmount";

const newNutrientsNames = {
  "Total lipid (fat)": "Fat",
  "Carbohydrate, by difference": "Carbs",
  "Fiber, total dietary": "Fiber"
};

const MacroDefinition = macro => {
  if (!macro.name) return null;
  const macroName = newNutrientsNames[macro.name] || macro.name;
  return (
    <Fragment>
      <dt title={macroName}>
        <img className="icon" src={`img/${macroName}.svg`} />
        <p data-macro-name={macroName}>{macroName}</p>
      </dt>
      <dd>
        <NutrientAmount nutrient={macro} />
      </dd>
    </Fragment>
  );
};

export default MacroDefinition;
