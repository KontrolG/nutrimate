import React from "react";
import { getContextValue } from "../../../context";
import Button from "../../Button";
import Icon from "../../Icon";

const SearchButton = props => {
  const { searchIsClosed, toggleSearchIsClosed } = getContextValue();
  const buttonIcon = searchIsClosed ? (
    <Icon name="search" />
  ) : (
    <Icon name="arrow-back" />
  );

  return (
    <Button className="toggle__search__button" onClick={toggleSearchIsClosed}>
      {buttonIcon}
    </Button>
  );
};

export default SearchButton;
