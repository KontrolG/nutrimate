import React, { Fragment } from "react";
import Header from "./SearchHeader";
import Main from "./SearchMain";
import "./Search.css";

const Search = props => {
  return (
    <Fragment>
      <Header />
      <Main />
    </Fragment>
  );
};

export default Search;
