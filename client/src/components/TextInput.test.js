import React from "react";
import TextInput from "./TextInput";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

const testTextInputChangeValue = () => {
  render(<TextInput />);
  const input = screen.getByRole("textbox");

  const textEntered = "Hello world!";
  userEvent.type(input, textEntered);

  expect(input).toHaveValue(textEntered);
  expect(input).not.toHaveValue("Anything else");
};

const testTextInputIsInvalidOnInvalidTyping = () => {
  render(<TextInput pattern="[\w\s%,.]+" />);
  const input = screen.getByRole("textbox");

  const textEntered = "He$#?llo";
  userEvent.type(input, textEntered);

  expect(input).toBeInvalid();
};

test(
  "TextInput change its value when user input something on it",
  testTextInputChangeValue
);

test(
  "TextInput is invalid when type invalid characters",
  testTextInputIsInvalidOnInvalidTyping
);
