import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navigation from "./layout/Navigation";
import Home from "./pages/home/Home";
import Food from "./pages/food/Food";

const ApplicationContent = props => {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route path="/food" component={Food} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default ApplicationContent;
