import React from "react";

const Icon = ({ name, ...restProps }) => (
  <i className={`icon-${name}`} {...restProps}></i>
);

export default Icon;
