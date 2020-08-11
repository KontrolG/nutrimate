import React from "react";
import NutritionFactRow from "./NutritionFactRow";

const NutritionFactsTableBody = ({ nutrients }) => {
  const toNutritionFactRow = nutrient => (
    <NutritionFactRow {...{ nutrient }} key={nutrient.name} />
  );
  const tableRows = nutrients.map(toNutritionFactRow);
  return <tbody>{tableRows}</tbody>;
};

export default NutritionFactsTableBody;
