import React from "react";
import { Switch, Route } from "react-router-dom";
import Search from "./search/Search";
import Details from "./details/Details";
import "./Food.css";

const Food = props => {
  return (
    <Switch>
      <Route exac path="/food/:id" component={Details} />
      <Route exac path="/food" component={Search} />
    </Switch>
  );
};

export default Food;
