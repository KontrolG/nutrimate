import React from "react";

const HeadingSection = ({ foodName }) => {
  console.log(foodName);
  return (
    <header>
      <h3 className="food__name">{foodName}</h3>
    </header>
  );
};

export default HeadingSection;
