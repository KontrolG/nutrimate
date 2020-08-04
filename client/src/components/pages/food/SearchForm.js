import React from "react";
import { getContextValue } from "../../../context";
import SearchButton from "./SearchButton";
import SearchInput from "./SearchInput";
import SearchReset from "./SearchReset";
import useInputValue from "../../../hooks/useInputValue";

const SearchForm = props => {
  const { searchIsClosed } = getContextValue();
  const [searchQuery, setSearchQuery, resetSearchQuery] = useInputValue("");
  const searchQueryIsEmpty = searchQuery === "";

  const resetSearchOnClose = () => {
    if (searchIsClosed) {
      resetSearchQuery();
    }
  };

  React.useEffect(resetSearchOnClose, [searchIsClosed]);

  const getResultsFromSearchQuery = event => {
    event.preventDefault();
  };

  return (
    <form
      action="/"
      className="search__form"
      onReset={resetSearchQuery}
      onSubmit={getResultsFromSearchQuery}
    >
      <SearchButton />
      <SearchInput value={searchQuery} onChange={setSearchQuery} />
      <SearchReset isHidden={searchQueryIsEmpty || searchIsClosed} />
    </form>
  );
};

export default SearchForm;
