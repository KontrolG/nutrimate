import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import Navigation from "./layout/Navigation";
import Home from "./pages/home/Home";
import Food from "./pages/food/Food";

const ApplicationRouter = props => {
  return (
    <HashRouter>
      <Navigation />
      <Switch>
        <Route path="/food" component={Food} />
        <Route exact path="/" component={Home} />
        <Route path="/" component={Home /* Error 404 */} />
      </Switch>
    </HashRouter>
  );
};

export default ApplicationRouter;
