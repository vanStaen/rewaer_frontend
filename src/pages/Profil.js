import React, { Component } from "react";

class ProfilPage extends Component {
  render() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    console.log(token);
    return (
      <div>
        <h1>Profil</h1>
        <h3>userID: {userId}</h3>
      </div>
    );
  }
}

export default ProfilPage;
