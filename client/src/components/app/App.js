import { createBrowserHistory } from "history";
import { Route, Switch, Router } from "react-router-dom";
import React from "react";
import Home from "../home/Home";
import Register from "../register/Register";
import Withdraw from "../withdraw/Withdraw";
import Deposit from "../deposit/Deposit";
import "./App.sass";
import AccountSummary from "../accountsummary/AccountSummary";

const hist = createBrowserHistory();

const App = () => (
  <Router history={hist}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/accountSummary" component={AccountSummary} />
      <Route path="/addUsers" component={Register} />
      <Route path="/withdraw" component={Withdraw} />
      <Route path="/deposit" component={Deposit} />
    </Switch>
  </Router>
);

export default App;
