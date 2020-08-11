import React from "react";
import FoodPortionSelect from "./FoodPortionSelect";

const FoodQuantityForm = ({ portions }) => {
  return (
    <form className="food__quantity">
      <span className="field__wrapper input__wrapper">
        <input
          type="number"
          id="quantity__input"
          className="form__control"
          placeholder="Qty"
          min="1"
          defaultValue="1"
        />
        <label htmlFor="quantity__input">Quantity</label>
      </span>
      <span className="multiply__sign">✕</span>
      {/* 2715 */}
      <span className="field__wrapper select__wrapper">
        <FoodPortionSelect {...{ portions }} />
        <label htmlFor="portion__select">Portion</label>
      </span>
    </form>
  );
};

export default FoodQuantityForm;
