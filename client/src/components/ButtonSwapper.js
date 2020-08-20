import React from "react";

const ButtonSwapper = props => {
  return (
    <ol className="buttons-swapper food__add__swapper">
      <li>
        <button className="btn" data-meal-name="breakfast">
          Breakfast
        </button>
      </li>
      <li>
        <button className="btn" data-meal-name="lunch">
          Lunch
        </button>
      </li>
      <li>
        <button className="btn" data-meal-name="dinner">
          Dinner
        </button>
      </li>
      <li>
        <button className="btn" data-meal-name="snack">
          Snack
        </button>
      </li>
    </ol>
  );
};

export default ButtonSwapper;
