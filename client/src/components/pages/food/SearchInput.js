import React from "react";

const SearchInput = props => (
  <input
    type="text"
    className="search__input form__control"
    name="search__input"
    id="search__input"
    placeholder="Search. Example: Coffe, Latte"
    required
    pattern="[\w\s%,.]+"
    title="Only alphanumeric and %,."
    {...props}
  />
);

export default SearchInput;
