import React, { Fragment } from "react";
import NutrientAmount from "../../../NutrientAmount";
import Icon from "../../../Icon";

const FoodTotalCalories = ({ calories }) => {
  return (
    <Fragment>
      <div className="food__calories calories">
        <Icon name="bolt" />
        <NutrientAmount nutrient={calories} />
      </div>
      <div className="food__weight-in-grams portion">
        <Icon name="plate" />
        <NutrientAmount nutrient={{ name: "calories", amount: 2 }} />
      </div>
    </Fragment>
  );
};

export default FoodTotalCalories;
