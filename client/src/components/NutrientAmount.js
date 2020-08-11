import React, { Fragment } from "react";

const getFixedAmount = (amount, amountDecimals) => {
  const parsedAmount = parseFloat(amount);
  const amountHasDecimals = parsedAmount % 1 !== 0;
  return amountHasDecimals
    ? parsedAmount.toFixed(amountDecimals)
    : parsedAmount;
};

const NutrientAmount = ({ nutrient, amountDecimals }) => {
  const { name, amount, unitName } = nutrient;

  const fixedAmount = getFixedAmount(amount, amountDecimals);

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
