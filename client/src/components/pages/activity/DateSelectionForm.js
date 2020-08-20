import React from "react";

const DateSelectionForm = props => {
  return (
    <form action="#" className="date__select__form">
      <label for="date__input">Today</label>
      <input
        type="date"
        className="date__input"
        name="date__input"
        id="date__input"
      />
    </form>
  );
};

export default DateSelectionForm;
