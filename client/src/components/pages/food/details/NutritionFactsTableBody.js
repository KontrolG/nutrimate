import React from "react";
import NutritionFactRow from "./NutritionFactRow";
import toElementsWithMappedProps from "../../../../utils/toElementsWithMappedProps";

const NutritionFactsTableBody = ({ nutrients }) => {
  const toNutritionFactRow = toElementsWithMappedProps(
    NutritionFactRow,
    "nutrient"
  );
  const tableRows = nutrients.map(toNutritionFactRow);

  return <tbody>{tableRows}</tbody>;
};

export default NutritionFactsTableBody;
