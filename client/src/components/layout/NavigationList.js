import React from "react";
// import { v4 as getRandomKey } from "uuid";
import navigationLinks from "./NavigationLinks";
import NavigationItem from "./NavigationItem";

const NavigationList = () => {
  const toNavigationItem = link => (
    <NavigationItem /* key={getRandomKey()} */ {...link} />
  );

  const navigationItems = navigationLinks.map(toNavigationItem);

  return <ul className="nav__list">{navigationItems}</ul>;
};

export default NavigationList;
