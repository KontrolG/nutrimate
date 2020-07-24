import React, { Fragment } from "react";
import Header from "./Header";
import Main from "./Main";
import "./Food.css";

const Food = props => {
  return (
    <Fragment>
      <Header />
      <Main />
    </Fragment>
  );
};

export default Food;
