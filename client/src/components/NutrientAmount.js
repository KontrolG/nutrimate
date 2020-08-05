import React, { Fragment } from "react";

const NutrientAmount = ({ nutrient, amountDecimals }) => {
  const { name, amount, unitName } = nutrient;

  const fixedAmount = parseFloat(amount).toFixed(amountDecimals);

  return (
    <Fragment>
      <span className="nutrient__amount" data-nutrient-name={name}>
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
