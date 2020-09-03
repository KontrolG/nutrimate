import React from "react";
import { NavLink } from "react-router-dom";
import Icon from "../../../Icon";
import NutrientAmount from "../../../NutrientAmount";
import MacrosList from "../../../MacrosList";

const ResultItem = ({
  fdcId,
  description,
  calories,
  portion,
  protein,
  carbohydrate,
  fat
}) => {
  return (
    <li>
      <NavLink
        className="results__fig"
        to={`/food/${fdcId}`}
        title={description}
      >
        <div className="results__summary">
          <p className="results__calories calories">
            <NutrientAmount nutrient={calories} amountDecimals={0} />
            <Icon name="bolt" />
          </p>
          <hr />
          <p className="results__portion portion">
            <Icon name="plate" />
            <span>{parseInt(portion.gramWeight, 10)}</span> g
          </p>
        </div>
        <div className="results__info">
          <h4 className="results__name text__with__ellipsis">{description}</h4>
          <MacrosList
            macros={[protein, carbohydrate, fat]}
            className="results__macros"
          />
        </div>
      </NavLink>
    </li>
  );
};

export default ResultItem;
