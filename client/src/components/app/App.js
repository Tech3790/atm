import React from "react";
import "./App.sass";
import Header from "../header/Header";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "../home/Home";
import Register from "../register/Register";
const App = () => (
  <div>
    <Header />
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/addusers" component={Register} />
        <Route path="/about" />
        <Route path="/contact" />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
