import React, { createRef } from "react";
import { getContextValue } from "../../../context";

const SearchInput = props => {
  const { searchIsClosed } = getContextValue();
  const inputRef = createRef();

  const focusInputElement = () => {
    if (!searchIsClosed) {
      inputRef.current.focus();
    }
  };

  React.useEffect(focusInputElement, [searchIsClosed]);

  return (
    <input
      type="text"
      className="search__input form__control"
      name="search__input"
      id="search__input"
      placeholder="Example: Coffe, Latte"
      ref={inputRef}
      {...props}
    />
  );
};

export default SearchInput;
