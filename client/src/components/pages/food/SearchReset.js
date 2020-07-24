import React from "react";
import Button from "../../Button";

const SearchReset = props => (
  <Button
    type="reset"
    icon={{ name: "clear" }}
    title="Clear input"
    {...props}
  />
);

export default SearchReset;
