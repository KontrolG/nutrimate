import React from "react";
import classNames from "classnames";
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

  const headerClassNames = classNames("search", {
    search__closed: searchIsClosed
  });

  return (
    <Header className={headerClassNames}>
      <Logo size="1.25rem" />
      <Provider value={{ searchIsClosed, toggleSearchIsClosed }}>
        <SearchForm />
      </Provider>
    </Header>
  );
};

export default FoodHeader;
