import React from "react";

const useInputValue = initialValue => {
  const [value, setValue] = React.useState(initialValue);
  const setValueOnChange = event => {
    const { value } = event.target;
    setValue(value);
  };
  const restartValue = event => setValue("");
  return [value, setValueOnChange, restartValue];
};

export default useInputValue;
