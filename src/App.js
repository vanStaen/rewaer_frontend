import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import AuthPage from "./pages/Auth";
import LooksPage from "./pages/Looks";
import ItemsPages from "./pages/Items";

import MainMenu from "./components/Menu";

import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <MainMenu />
        <Switch>
          <Redirect from="/" to="/auth" exact />
          <Route path="/auth" component={AuthPage} />
          <Route path="/looks" component={LooksPage} />
          <Route path="/items" component={ItemsPages} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
