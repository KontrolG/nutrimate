import React from "react";
import { getContextValue } from "../../../context";
import SearchButton from "./SearchButton";
import SearchInput from "./SearchInput";
import SearchReset from "./SearchReset";

const useInputValue = initialValue => {
  const [value, setValue] = React.useState(initialValue);

  const setValueOnChange = event => {
    const { value } = event.target;
    setValue(value);
  };

  const restartValue = event => setValue("");

  return [value, setValueOnChange, restartValue];
};

const SearchForm = props => {
  const { searchIsClosed } = getContextValue();
  const [searchQuery, setSearchQuery, resetSearchQuery] = useInputValue("");
  const searchQueryIsEmpty = searchQuery === "";

  return (
    <form action="/" className="search__form" onReset={resetSearchQuery}>
      <SearchButton />
      <SearchInput value={searchQuery} onChange={setSearchQuery} />
      <SearchReset isHidden={searchQueryIsEmpty || searchIsClosed} />
    </form>
  );
};

export default SearchForm;
