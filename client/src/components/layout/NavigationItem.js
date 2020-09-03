import React from "react";
import { NavLink } from "react-router-dom";
import Icon from "../Icon";

const NavigationItem = ({ text, url, iconName }) => {
  const isCorrectPath = (match, { pathname }) => {
    if (url === "/" && pathname === "/") return true;
    return pathname.startsWith(url) && url !== "/";
  };

  return (
    <li>
      <NavLink exact to={url} className="nav__item" isActive={isCorrectPath}>
        <Icon name={iconName} />
        {text}
      </NavLink>
    </li>
  );
};

export default NavigationItem;
