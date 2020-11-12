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

const refreshToken = localStorage.getItem("refreshToken");

const openNotification = (msg) => {
  notification.open({
    message: msg,
    description:
      "The connection could not be established with the backend server.",
    duration: 0,
    type: "error",
    placement: "bottomRight",
  });
};

class App extends Component {
  state = {
    token: null,
    refreshToken: refreshToken || null,
  };

  login = (token, refreshToken) => {
    this.setState({ token: token, refreshToken: refreshToken });
    if (process.env.NODE_ENV === "development") {
      console.log("[login] Access Token:  ", this.state.token);
      console.log("[login] Refresh Token:  ", this.state.refreshToken);
    }
  };

  logout = () => {
    // Delete refreshtoken from localstorage, 
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    localStorage.clear();
    // Delete token from context
    this.setState({ token: null, refreshToken: null });
    // Delete refreshtoken from db
    const deleteRequest = { refreshToken: this.state.refreshToken }
    console.log('Delete request : ', deleteRequest)
    fetch(process.env.REACT_APP_AUTH_URL + "/logout", {
      method: "DELETE",
      body: JSON.stringify(deleteRequest),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 204) {
          throw new Error("Error when logout!"); // Probably was the refresh not found in the db
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    //show tokens
    if (process.env.NODE_ENV === "development") {
      console.log("[Render] Access Token:  ", this.state.token);
      console.log("[Render] Refresh Token:  ", this.state.refreshToken);
    }

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
      .catch((err) => {
        console.log("Error connecting to the back end");
        openNotification("Connection to server failed!");
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
                refreshToken: this.state.refreshToken,
                login: this.login,
                logout: this.logout,
              }}
            >
              <MenuBar />
              <main className="main-content">
                <Switch>
                  {!this.state.refreshToken && (
                    <Redirect from="/" to="/auth" exact />
                  )}
                  {!this.state.refreshToken && (
                    <Route path="/auth" component={AuthPage} />
                  )}
                  {!this.state.refreshToken && (
                    <Redirect from="/looks" to="/auth" exact />
                  )}
                  {!this.state.refreshToken && (
                    <Redirect from="/items" to="/auth" exact />
                  )}
                  {!this.state.refreshToken && (
                    <Redirect from="/mail" to="/auth" exact />
                  )}
                  {!this.state.refreshToken && (
                    <Redirect from="/friends" to="/auth" exact />
                  )}
                  {!this.state.refreshToken && (
                    <Redirect from="/profile" to="/auth" exact />
                  )}
                  {this.state.refreshToken && (
                    <Redirect from="/" to="/profile" exact />
                  )}
                  {this.state.refreshToken && (
                    <Redirect from="/auth" to="/profile" exact />
                  )}
                  {this.state.refreshToken && (
                    <Route path="/looks" component={LooksPage} />
                  )}
                  {this.state.refreshToken && (
                    <Route path="/items" component={ItemsPage} />
                  )}
                  {this.state.refreshToken && (
                    <Route path="/mail" component={MailPage} />
                  )}
                  {this.state.refreshToken && (
                    <Route path="/friends" component={FriendsPage} />
                  )}
                  {this.state.refreshToken && (
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
