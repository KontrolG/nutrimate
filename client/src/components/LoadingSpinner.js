import React from "react";
import Icon from "./Icon";
import "./LoadingSpinner.css";

const LoadingSpinner = ({ className, ...props }) => {
  return (
    <p className={`loader ${className}`}>
      <Icon name="spinner" />
    </p>
  );
};

LoadingSpinner.defaultProps = { className: "" };

export default LoadingSpinner;
