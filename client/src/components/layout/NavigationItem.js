import React from "react";
import { NavLink } from "react-router-dom";
import Icon from "../Icon";

const NavigationItem = ({ text, url, iconName }) => {
  return (
    <li>
      <NavLink exact to={url} className="nav__item">
        <Icon name={iconName} />
        {text}
      </NavLink>
    </li>
  );
};

export default NavigationItem;
