import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import Navigation from "./layout/Navigation";
import Home from "./pages/home/Home";
import Food from "./pages/food/Food";

const ApplicationContent = props => {
  return (
    <HashRouter>
      <Navigation />
      <Switch>
        <Route path="/food" component={Food} />
        <Route path="/" component={Home} />
      </Switch>
    </HashRouter>
  );
};

export default ApplicationContent;
