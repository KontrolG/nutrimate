import React from "react";
import NavLinkWithButton from "../../../NavLinkWithButton";

const ReturnButton = props => {
  return (
    <NavLinkWithButton
      icon={{ name: "arrow-back" }}
      to="/food"
      title="Go Back"
    />
  );
};

export default ReturnButton;
