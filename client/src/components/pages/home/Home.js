import React, { Fragment } from "react";
import Header from "./Header";
import Main from "./Main";
import "./Home.css";

const Home = props => {
  return (
    <Fragment>
      <Header />
      <Main />
    </Fragment>
  );
};

export default Home;
