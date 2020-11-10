import React, { Component } from "react";
import AuthContext from "../../context/auth-context";

class ProfilPage extends Component {
  
  static contextType = AuthContext;

  render() {
    const userId = localStorage.getItem("userId");
    return (
      <div>
        <h1>Profil</h1>
        {this.context.refreshToken && (<h3>userID: {userId}</h3>)}
        {this.context.refreshToken && (<h3>token: {this.context.token}</h3>)}
        {this.context.refreshToken && (<h3>refreshToken: {this.context.refreshToken}</h3>)}
      </div>
    );
  }
}

export default ProfilPage;
