import React, { forwardRef } from "react";

const SearchInput = forwardRef((props, forwardedRef) => {
  return (
    <input
      type="text"
      className="search__input form__control"
      name="search__input"
      id="search__input"
      placeholder="Example: Coffe, Latte"
      required
      pattern="[\w\s%,.]+"
      title="Only alphanumeric and %,."
      ref={forwardedRef}
      {...props}
    />
  );
});

export default SearchInput;
