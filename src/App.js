import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { authStore } from './stores/authStore';
import { openNotification } from "./components/openNotification/openNotification";
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

class App extends Component {

  dummyCall() {

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
        openNotification("Connection to server failed!",
          "The connection could not be established with the backend server.", 0, "warning");
        console.log(err);
      });
  }

  componentDidMount() {

    this.dummyCall();

    // Axios Interceptors
    axios.interceptors.request.use(async (config) => {
      const newToken = await authStore.getNewToken();
      console.log(newToken);
      config.headers = {
        'Authorization': `Bearer ${newToken}`,
        'Content-Type': 'application/json',
      }
      config.validateStatus = (status) => {
        return true;
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    });
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <React.Fragment>
            <AuthContext.Provider
              value={{
                token: authStore.token,
                refreshToken: authStore.refreshToken,
                login: authStore.login,
                logout: authStore.logout,
                getNewToken: authStore.getNewToken,
              }}
            >
              <MenuBar />
              <main className="main-content">
                <Switch>
                  {!authStore.refreshToken && (
                    <Redirect from="/" to="/auth" exact />
                  )}
                  {!authStore.refreshToken && (
                    <Route path="/auth" component={AuthPage} />
                  )}
                  {!authStore.refreshToken && (
                    <Redirect from="/looks" to="/auth" exact />
                  )}
                  {!authStore.refreshToken && (
                    <Redirect from="/items" to="/auth" exact />
                  )}
                  {!authStore.refreshToken && (
                    <Redirect from="/mail" to="/auth" exact />
                  )}
                  {!authStore.refreshToken && (
                    <Redirect from="/friends" to="/auth" exact />
                  )}
                  {!authStore.refreshToken && (
                    <Redirect from="/profile" to="/auth" exact />
                  )}
                  {authStore.refreshToken && (
                    <Redirect from="/" to="/profile" exact />
                  )}
                  {authStore.refreshToken && (
                    <Redirect from="/auth" to="/profile" exact />
                  )}
                  {authStore.refreshToken && (
                    <Route path="/looks" component={LooksPage} />
                  )}
                  {authStore.refreshToken && (
                    <Route path="/items" component={ItemsPage} />
                  )}
                  {authStore.refreshToken && (
                    <Route path="/mail" component={MailPage} />
                  )}
                  {authStore.refreshToken && (
                    <Route path="/friends" component={FriendsPage} />
                  )}
                  {authStore.refreshToken && (
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
