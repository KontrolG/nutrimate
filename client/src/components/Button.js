import React from "react";
import classNames from "classnames";
import Icon from "./Icon";
import getDisplayName from "../utils/getDisplayName";
import "./Button.css";

const withButton = ElementWrapper => {
  const withButton = ({
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
      <ElementWrapper className={buttonClassNames} {...restProps}>
        {icon && <Icon {...icon} />}
        {children}
      </ElementWrapper>
    );
  };

  withButton.displayName = `withButton(${getDisplayName(ElementWrapper)})`;
  withButton.defaultProps = {
    type: "button"
  };

  return withButton;
};

export { withButton };
export default withButton("button");
