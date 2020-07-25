import React from "react";
import classNames from "classnames";
import Icon from "./Icon";
import "./Button.css";

const Button = ({
  className,
  isFilled,
  isPrimary,
  icon,
  children,
  ...restProps
}) => {
  const buttonClassNames = classNames(
    "button",
    {
      "button-primary": isPrimary,
      "button-filled": isFilled
    },
    className
  );

  return (
    <button className={buttonClassNames} {...restProps}>
      {icon && <Icon {...icon} />}
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: "button"
};

export default Button;
