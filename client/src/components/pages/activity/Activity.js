import React, { Fragment } from "react";
import Header from "./ActivityHeader";
import Main from "./ActivityMain";
import "./Activity.css";

const Food = ({ match }) => {
  return (
    <Fragment>
      <Header />
      <Main />
    </Fragment>
  );
};

export default Food;
