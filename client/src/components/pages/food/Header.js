import React from "react";
import { Provider } from "../../../context";
import Header from "../../layout/Header";
import Logo from "../../Logo";
import SearchForm from "./SearchForm";

const useToggle = initialState => {
  const [state, setState] = React.useState(initialState);

  const toggleState = () => setState(negateState);

  const negateState = currentState => !currentState;

  return [state, toggleState];
};

const FoodHeader = props => {
  const [searchIsClosed, toggleSearchIsClosed] = useToggle(true);

  const classNames = ["search"];

  if (searchIsClosed) classNames.push("search__closed");

  return (
    <Header className={classNames.join(" ")}>
      <Logo />
      <Provider value={{ searchIsClosed, toggleSearchIsClosed }}>
        <SearchForm />
      </Provider>
    </Header>
  );
};

export default FoodHeader;
