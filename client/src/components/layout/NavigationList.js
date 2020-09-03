import React from "react";
import navigationLinks from "./NavigationLinks";
import NavigationItem from "./NavigationItem";
import toElementsWithMappedProps from "../../utils/toElementsWithMappedProps";

const NavigationList = () => {
  const toNavigationItem = toElementsWithMappedProps(NavigationItem);
  const navigationItems = navigationLinks.map(toNavigationItem);

  return <ul className="nav__list">{navigationItems}</ul>;
};

export default NavigationList;
