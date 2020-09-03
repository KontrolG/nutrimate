import React from "react";
import NutrientAmount from "../../../NutrientAmount";

const NutritionFactRow = ({ nutrient }) => (
  <tr title={nutrient.name}>
    <td>{nutrient.name}</td>
    <td>
      <NutrientAmount nutrient={nutrient} />
    </td>
  </tr>
);

export default NutritionFactRow;
