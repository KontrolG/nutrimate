import React from "react";
import Button from "../../Button";
import Icon from "../../Icon";

const SearchButton = ({ searchIsClosed, ...props }) => {
  const iconName = searchIsClosed ? "search" : "arrow-back";

  return (
    <Button className="toggle__search__button" {...props}>
      <Icon name={iconName} />
    </Button>
  );
};

export default SearchButton;
