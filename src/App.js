import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import AuthPage from "./pages/Auth";
import LooksPage from "./pages/Looks";
import ItemsPage from "./pages/Items";
import MailPage from "./pages/Mail";
import FriendsPage from "./pages/Friends";
import InfoPage from "./pages/Info";
import MenuBar from "./components/MenuBar";
import AuthContext from "./context/auth-context";

import "./App.css";

class App extends Component {
  state = {
    token: null,
    userId: null,
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <React.Fragment>
            <AuthContext.Provider
              value={{
                token: this.state.token,
                userId: this.state.userId,
                login: this.login,
                logout: this.logout,
              }}
            >
              <MenuBar />
              <main className="main-content">
                <Switch>
                  {!this.state.token && <Redirect from="/" to="/auth" exact />}
                  {!this.state.token && (
                    <Route path="/auth" component={AuthPage} />
                  )}
                  {this.state.token && (
                    <Route path="/looks" component={LooksPage} />
                  )}
                  {this.state.token && (
                    <Route path="/items" component={ItemsPage} />
                  )}
                  {this.state.token && (
                    <Route path="/mail" component={MailPage} />
                  )}
                  {this.state.token && (
                    <Route path="/friends" component={FriendsPage} />
                  )}
                  <Route path="/info" component={InfoPage} />
                </Switch>
              </main>
            </AuthContext.Provider>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
