import React, { Fragment } from "react";
import NutrientAmount from "./NutrientAmount";

const newNutrientsNames = {
  "Total lipid (fat)": "Fat",
  "Carbohydrate, by difference": "Carbs",
  "Fiber, total dietary": "Fiber"
};

const MacroDefinition = props => {
  if (!props.name) return null;
  const macroName = newNutrientsNames[props.name] || props.name;
  return (
    <Fragment>
      <dt title={macroName}>
        <img className="icon" src={`img/${macroName}.svg`} />
        <p data-macro-name={macroName}>{macroName}</p>
      </dt>
      <dd>
        <NutrientAmount nutrient={props} />
      </dd>
    </Fragment>
  );
};

export default MacroDefinition;
