import React, { Component } from "react";

class LooksPage extends Component {
  render() {
    return (
      <div>
        <h1>Items Page</h1>
        <small>
          You are running this application in <b>{process.env.NODE_ENV}</b>{" "}
          mode, linked with <b>{process.env.REACT_APP_API_URL}</b>.
        </small>
      </div>
    );
  }
}

export default LooksPage;
