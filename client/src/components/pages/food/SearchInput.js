import React from "react";
import TextInput from "../../TextInput";

const SearchInput = props => {
  return (
    // <input
    //   type="text"
    //   className="search__input form__control"
    //   name="search__input"
    //   id="search__input"
    //   placeholder="Example: Coffe, Latte"
    // />
    <TextInput
      className="search__input form__control"
      placeholder="Example: Coffe, Latte"
      required
      pattern="[\w\s%,.]+"
      title="Only alphanumeric and %,."
      {...props}
    />
  );
};

export default SearchInput;
