import React from "react";
import { Switch, Route } from "react-router-dom";
import Search from "./search/Search";
import Details from "./details/Details";
import "./Food.css";

const Food = ({ match }) => {
  const { url } = match;
  return (
    <Switch>
      <Route exac path={`${url}/:id`} component={Details} />
      <Route exac path={url} component={Search} />
    </Switch>
  );
};

export default Food;
