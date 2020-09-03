import React from "react";

const PortionOption = ({
  gramWeight,
  portionDescription,
  amount,
  name,
  ...props
}) => {
  const portionName = portionDescription || `${amount} ${name}`;
  return (
    <option value={gramWeight} {...props}>
      {portionName} - {gramWeight} g
    </option>
  );
};

export default PortionOption;
