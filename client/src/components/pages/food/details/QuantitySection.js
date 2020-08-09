import React from "react";
import NutrientAmount from "../../../NutrientAmount";

const QuantitySection = props => {
  return (
    <section className="food__quantity">
      <p className="food__calories calories">
        <NutrientAmount nutrient={{ name: "calories", amount: 2 }} />
      </p>
      <form /* className="food__quantity" */>
        <span className="field__wrapper input__wrapper"></span>
        <span className="multiply__sign">&Cross;</span>
        <span className="field__wrapper select__wrapper"></span>
      </form>
      <dl className="food__macros macros__data"></dl>
    </section>
  );
};

export default QuantitySection;
