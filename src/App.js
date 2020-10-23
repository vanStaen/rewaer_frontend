import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import AuthPage from "./pages/Auth";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect from="/" to="/auth" exact />
        <Route path="/auth" component={AuthPage} />
        <Route path="/looks" component={null} />
        <Route path="/items" component={null} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
