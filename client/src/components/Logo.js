import React from "react";

const Logo = ({ height }) => {
  const styleFromProps = {
    height,
    transform: "rotate(-45deg)"
  };

  return (
    <img
      className="logo"
      style={styleFromProps}
      src="img/logo.png"
      alt="Nutrimate Logo"
    />
  );
};

Logo.defaultProps = {
  height: "1.5rem"
};

export default Logo;
