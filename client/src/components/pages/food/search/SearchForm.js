import React, { createRef } from "react";
import SearchButton from "./SearchButton";
import SearchInput from "./SearchInput";
import SearchReset from "./SearchReset";
import useInputValue from "../../../../hooks/useInputValue";

const SearchForm = ({ query, setQuery, isClosed, toggleIsClosed }) => {
  const [
    searchInputValue,
    setSearchInputValue,
    resetSearchInputValue
  ] = useInputValue(query);
  const searchInputRef = createRef();
  const searchInputIsEmpty = searchInputValue === "";

  const resetSearchQuery = () => {
    resetSearchInputValue();
    setQuery("");
  };

  const focusSearchInput = () => searchInputRef.current.focus();
  const blurSearchInput = () => searchInputRef.current.blur();

  const changeSearchInputOnToggle = () => {
    if (isClosed) {
      resetSearchQuery();
    } else {
      focusSearchInput();
    }
  };

  React.useEffect(changeSearchInputOnToggle, [isClosed]);

  const getResultsFromSearchQuery = event => {
    event.preventDefault();
    setQuery(searchInputValue);
    blurSearchInput();
  };

  return (
    <form
      action="/"
      className="search__form"
      onReset={resetSearchInputValue}
      onSubmit={getResultsFromSearchQuery}
    >
      <SearchButton onClick={toggleIsClosed} searchIsClosed={isClosed} />
      <SearchInput
        value={searchInputValue}
        onChange={setSearchInputValue}
        ref={searchInputRef}
      />
      <SearchReset
        isHidden={searchInputIsEmpty || isClosed}
        onClick={focusSearchInput}
      />
    </form>
  );
};

export default SearchForm;
