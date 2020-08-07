import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import Header from "../../layout/Header";
import Logo from "../../Logo";
import SearchForm from "./SearchForm";
import { setQuery, toggleIsClosed } from "../../../actions/search";

const FoodHeader = ({ query, setQuery, isClosed, toggleIsClosed }) => {
  const headerClassNames = classNames("search", {
    search__closed: isClosed
  });

  return (
    <Header className={headerClassNames}>
      <Logo size="1.25rem" />
      <SearchForm
        {...{
          query,
          setQuery,
          isClosed,
          toggleIsClosed
        }}
      />
    </Header>
  );
};

const mapStateToProps = ({ search }) => {
  const { isClosed, query } = search;
  return {
    isClosed,
    query
  };
};

const mapDispatchToProps = {
  setQuery,
  toggleIsClosed
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodHeader);
