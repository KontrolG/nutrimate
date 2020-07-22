import React from "react";
import Icon from "./Icon";
import "./Button.css";

const Button = ({ className, isFilled, isPrimary, icon, children }) => {
  const classNames = [className, "button"];
  if (isFilled) classNames.push("button-filled");
  if (isPrimary) classNames.push("button-primary");

  return (
    <button className={classNames.join(" ")} type="button">
      {icon && <Icon {...icon} />}
      {children}
    </button>
  );
};

export default Button;
