import React from "react";
import Icon from "./Icon";

const Logo = ({ size, ...restProps }) => (
  <Icon
    name="logo"
    alt="Nutrimate Logo"
    style={{ color: "#fdb035", fontSize: size }}
    {...restProps}
  />
);

Logo.defaultProps = {
  size: "1rem"
};

export default Logo;
