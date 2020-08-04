import React, { Fragment } from "react";

const NutrientAmount = ({ nutrient }) => {
  const { name, amount, unitName } = nutrient;

  const fixDecimals = (number, digits = 1) =>
    parseFloat(number).toFixed(digits);

  return (
    <Fragment>
      <span className="nutrient__amount" data-nutrient-name={name}>
        {fixDecimals(amount)}
      </span>{" "}
      {unitName}
    </Fragment>
  );
};

export default NutrientAmount;
