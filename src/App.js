import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { notification } from "antd";
import jsonwebtoken from "jsonwebtoken";
import axios from 'axios';

import AuthPage from "./pages/auth/Auth";
import LooksPage from "./pages/looks/Looks";
import ItemsPage from "./pages/items/Items";
import MailPage from "./pages/mail/Mail";
import FriendsPage from "./pages/friends/Friends";
import InfoPage from "./pages/info/Info";
import ProfilPage from "./pages/profil/Profil";
import MenuBar from "./components/MenuBar/MenuBar";
import AuthContext from "./context/auth-context";

import "./App.css";

const DEBUG = process.env.NODE_ENV === "development";

const openNotification = (msg, desc, showtime, type) => {
  notification.open({
    message: msg,
    description: desc,
    duration: showtime,
    type: type,
    placement: "bottomRight",
  });
};

const refreshToken = localStorage.getItem("refreshToken");

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
    localStorage.removeItem("user");
    localStorage.clear();
    // Delete token from context
    this.setState({ token: null, refreshToken: null });
    // Delete refreshtoken from db
    const deleteRequest = { refreshToken: this.state.refreshToken }
    if (process.env.NODE_ENV === "development") {
      console.log("[logout] Delete request:", deleteRequest);
    }
    fetch(process.env.REACT_APP_AUTH_URL + "/logout", {
      method: "DELETE",
      body: JSON.stringify(deleteRequest),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 204) {
          openNotification("Error " + res.status,
            "Error on logout: The refresh token was not found in the token database.", 0, "error");
          throw new Error("Error when logout!"); // Probably was the refresh not found in the db
        }
        openNotification("You have successfully logged out.", "", 3, "success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getNewToken = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (process.env.NODE_ENV === "development") {
      console.log("[script] Check access token");
    }

    // Check if refreshtoken is expired
    if (refreshToken) {
      let decodedRefreshToken = jsonwebtoken.decode(refreshToken, {
        complete: true,
      });
      let dateNow = new Date();
      if (decodedRefreshToken.exp < Math.floor(dateNow.getTime() / 1000)) {
        console.log("[script] REFRESH TOKEN HAS EXPIRED!");
        this.context.logout();
      }
    }

    // Check if token is expired
    if (this.state.token) {
      let decodedToken = jsonwebtoken.decode(this.state.token, {
        complete: true,
      });
      let dateNow = new Date();
      if (decodedToken.exp < Math.floor(dateNow.getTime() / 1000)) {
        console.log("[script] TOKEN HAS EXPIRED!");
        this.state.token = null;
      }
    }

    // Refresh token if token missing
    if (!this.state.token) {
      if (process.env.NODE_ENV === "development") {
        console.log("[script] Fetching a new token");
      }
      let requestBody = { refreshToken: refreshToken };
      fetch(process.env.REACT_APP_AUTH_URL + "/token", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status !== 201) {
            this.context.logout();
            throw new Error("Error when refreshing the token!");
          }
          return res.json();
        })
        .then((resData) => {
          localStorage.setItem("refreshToken", resData.refreshToken);
          if (resData.token) {
            this.login(
              resData.token,
              resData.refreshToken
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  dummyCall() {

    //show tokens
    if (process.env.NODE_ENV === "development") {
      console.log("[start] Call dummy endpoint");
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
        console.log("[start] Error connecting to the back end");
        openNotification("Connection to server failed!",
          "The connection could not be established with the backend server.", 0, "warning");
        console.log(err);
      });
  }

  componentDidMount() {

    this.dummyCall();

    // Axios Interceptors
    axios.interceptors.request.use((config) => {
      if (DEBUG) {
        console.log("[Axios Interceptor]")
        //console.info("✉️ ", config);
      }
      this.getNewToken();
      return Promise.resolve(config);
    }, (error) => {
      if (DEBUG) { console.error("✉️ ", error); }
      return Promise.reject(error);
    });

    //show tokens
    if (process.env.NODE_ENV === "development") {
      console.log("[start] Access Token:  ", this.state.token);
      console.log("[start] Refresh Token:  ", this.state.refreshToken);
    }

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
                getNewToken: this.getNewToken,
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
