import React from "react";
import NavLinkWithButton from "../../NavLinkWithButton";

const SearchShortcut = props => {
  return (
    <NavLinkWithButton
      to="/food"
      className="search__shortcut"
      icon={{ name: "search" }}
      isFilled
      {...props}
    >
      Search Food
    </NavLinkWithButton>
  );
};

export default SearchShortcut;
