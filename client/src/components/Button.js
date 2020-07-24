import React from "react";
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
  const classNames = [className, "button"];
  if (isFilled) classNames.push("button-filled");
  if (isPrimary) classNames.push("button-primary");

  return (
    <button className={classNames.join(" ")} {...restProps}>
      {icon && <Icon {...icon} />}
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: "button"
};

export default Button;
