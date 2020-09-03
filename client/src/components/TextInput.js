import React from "react";

const TextInput = props => {
  const [value, setValue] = React.useState("");

  // const setValueToInputValue = event => {
  //   const inputValue = event.target.value;
  //   if (isValidValue(inputValue)) {
  //     return setValue(inputValue);
  //   }
  //   setIsInvalid(true);
  // };

  // const isValidValue = value => /[\w\s%,.]+/.test(value);

  const changeValue = ({ target }) => {
    const inputValue = target.value;
    setValue(inputValue);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={changeValue}
      onInvalid={event => setValue("Is invalid")}
      {...props}
    />
  );
};

export default TextInput;
