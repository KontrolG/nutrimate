import React from "react";
import classNames from "classnames";
import Header from "../../layout/Header";
import Logo from "../../Logo";
import SearchForm from "./SearchForm";
import useToggle from "../../../hooks/useToggle";

const FoodHeader = props => {
  const [searchIsClosed, toggleSearchIsClosed] = useToggle(true);

  const headerClassNames = classNames("search", {
    search__closed: searchIsClosed
  });

  return (
    <Header className={headerClassNames}>
      <Logo size="1.25rem" />
      <SearchForm {...{ searchIsClosed, toggleSearchIsClosed }} />
    </Header>
  );
};

export default FoodHeader;
