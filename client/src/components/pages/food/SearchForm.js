import React, { createRef } from "react";
import { connect } from "react-redux";
import SearchButton from "./SearchButton";
import SearchInput from "./SearchInput";
import SearchReset from "./SearchReset";
import useInputValue from "../../../hooks/useInputValue";
import { setSearchQuery } from "../../../actions/search";

const SearchForm = ({ test, onTest, searchIsClosed, toggleSearchIsClosed }) => {
  const [searchQuery, setSearchQuery, resetSearchQuery] = useInputValue(test);
  const searchInputRef = createRef();
  const searchQueryIsEmpty = searchQuery === "";

  const changeSearchInputOnToggle = () => {
    if (searchIsClosed) {
      resetSearchQuery();
    } else {
      searchInputRef.current.focus();
    }
  };

  React.useEffect(changeSearchInputOnToggle, [searchIsClosed]);

  const getResultsFromSearchQuery = event => {
    event.preventDefault();
    onTest();
  };

  return (
    <form
      action="/"
      className="search__form"
      onReset={resetSearchQuery}
      onSubmit={getResultsFromSearchQuery}
    >
      <SearchButton
        onClick={toggleSearchIsClosed}
        searchIsClosed={searchIsClosed}
      />
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        ref={searchInputRef}
      />
      <SearchReset isHidden={searchQueryIsEmpty || searchIsClosed} />
    </form>
  );
};

const mapStateToProps = state => ({
  test: state.searchQuery
});

const mapDispatchToProps = dispatch => ({
  onTest: () => dispatch(setSearchQuery("Any"))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
