import React from "react";
import Button from "../../../Button";

const SearchReset = ({ isHidden, ...restProps }) => {
  const visibility = isHidden ? "hidden" : "visible";

  return (
    <Button
      type="reset"
      icon={{ name: "clear" }}
      title="Clear input"
      style={{ visibility }}
      {...restProps}
    />
  );
};

export default SearchReset;
