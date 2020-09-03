import React, { Fragment } from "react";
import getNumberWithFixedDecimals from "../utils/getNumberWithFixedDecimals";

const NutrientAmount = ({ nutrient, amountDecimals }) => {
  const { name, amount, unitName } = nutrient;

  const fixedAmount = getNumberWithFixedDecimals(amount, amountDecimals);

  return (
    <Fragment>
      <span
        className="nutrient__amount"
        data-nutrient-name={name}
        title={`Amount of ${name}`}
      >
        {fixedAmount}
      </span>{" "}
      {unitName}
    </Fragment>
  );
};

NutrientAmount.defaultProps = {
  amountDecimals: 1
};

export default NutrientAmount;
