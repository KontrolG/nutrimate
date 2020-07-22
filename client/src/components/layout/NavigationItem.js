import React from "react";
import Icon from "../Icon";

const NavigationItem = ({ isActive, text, url, iconName }) => {
  return (
    <li>
      <a className={`nav__item ${isActive && "nav__active"}`} href={url}>
        <Icon name={iconName} />
        {text}
      </a>
    </li>
  );
};

export default NavigationItem;
