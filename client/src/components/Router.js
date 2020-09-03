import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Navigation from "./layout/Navigation";
import Home from "./pages/home/Home";
import Food from "./pages/food/Food";
import Activity from "./pages/activity/Activity";

const ApplicationRouter = props => {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path="/activity" component={Activity} />
        <Route path="/food" component={Food} />
        <Route exact path="/" component={Home} />
        <Route path="/" component={Home /* Error 404 */} />
      </Switch>
    </Router>
  );
};

export default ApplicationRouter;
