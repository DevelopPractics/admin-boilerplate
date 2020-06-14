import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from "./Dashboard";

function MainRouter() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/*" component={Dashboard}></Route>
        </Switch>
      </div>
    </Router>
  );
}
export default MainRouter;
