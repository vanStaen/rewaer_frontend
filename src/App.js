import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { notification } from "antd";

import AuthPage from "./pages/Auth";
import LooksPage from "./pages/looks/Looks";
import ItemsPage from "./pages/items/Items";
import MailPage from "./pages/mail/Mail";
import FriendsPage from "./pages/friends/Friends";
import InfoPage from "./pages/info/Info";
import ProfilPage from "./pages/profil/Profil";
import MenuBar from "./components/MenuBar";
import AuthContext from "./context/auth-context";

import "./App.css";

const openNotification = () => {
  notification.open({
    message: "Connection to server failed!",
    description:
      "The connection could not be established with the backend server.",
    duration: 0,
    type: "error",
    placement: "bottomRight",
  });
};

const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

class App extends Component {
  state = {
    token: token || null,
    userId: userId || null,
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.clear();
  };

  componentDidMount() {
    // call the the dummy endpoint to wake the backend.
    let requestBody = {
      query: `
            query {
              dummy {
                dummy
                }
              }
            `,
    };
    fetch(process.env.REACT_APP_API_URL, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        console.log("Backend awake? " + resData.data.dummy.dummy);
      })
      .catch((err) => {
        console.log("Error connecting to the back end");
        openNotification();
        console.log(err);
      });
  }

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
                  {!this.state.token && (
                    <Redirect from="/looks" to="/auth" exact />
                  )}
                  {!this.state.token && (
                    <Redirect from="/items" to="/auth" exact />
                  )}
                  {!this.state.token && (
                    <Redirect from="/mail" to="/auth" exact />
                  )}
                  {!this.state.token && (
                    <Redirect from="/friends" to="/auth" exact />
                  )}
                  {!this.state.token && (
                    <Redirect from="/profile" to="/auth" exact />
                  )}
                  {this.state.token && (
                    <Redirect from="/" to="/profile" exact />
                  )}
                  {this.state.token && (
                    <Redirect from="/auth" to="/profile" exact />
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
                  {this.state.token && (
                    <Route path="/profile" component={ProfilPage} />
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
