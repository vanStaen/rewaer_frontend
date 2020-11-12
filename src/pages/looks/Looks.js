import { Col, Row } from "antd";
import React, { Component } from "react";
import jsonwebtoken from "jsonwebtoken";

import LookCard from "./LookCard";
import LookForm from "./LookForm";
import AuthContext from "../../context/auth-context";

import "./Looks.css";

class LooksPage extends Component {

  static contextType = AuthContext;

  render() {
    const loadLooks = (userId) => {
      const requestBody = {
        query: `
              query {
                  looks {
                    title
                    active
                    favorite
                    mediaUrl
                  }
                }
                `,
      };

      fetch(process.env.REACT_APP_API_URL, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.context.token,
        },
      })
        .then((res) => {
          if ((res.status !== 200) & (res.status !== 201)) {
            throw new Error("Unauthenticated!");
          }
          return res.json();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // Check if refreshtoken is expired
    if (this.context.refreshToken) {
      let decodedRefreshToken = jsonwebtoken.decode(this.context.refreshToken, {
        complete: true,
      });
      let dateNow = new Date();
      if (decodedRefreshToken.exp < Math.floor(dateNow.getTime() / 1000)) {
        console.log("REFRESH TOKEN HAS EXPIRED!");
        this.context.logout();
      }
    }

    // Check if token is expired
    if (this.context.token) {
      let decodedToken = jsonwebtoken.decode(this.context.token, {
        complete: true,
      });
      let dateNow = new Date();
      if (decodedToken.exp < Math.floor(dateNow.getTime() / 1000)) {
        console.log("TOKEN HAS EXPIRED!");
        this.context.login(
          null,
          this.context.refreshToken
        );
      }
    }

    // Refresh token is token missing
    if (!this.context.token) {
      let requestBody = { refreshToken: this.context.refreshToken };
      fetch(process.env.REACT_APP_AUTH_URL + "/token", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resData) => {
          if (resData.status !== 201) {
            throw new Error("Error when refreshing the token!");
          }
          if (resData.token) {
            this.context.login(
              resData.token,
              resData.refreshToken
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return (
      <div>
        {loadLooks()}
        <Row justify={"space-around"}>
          <Col>
            <LookForm />
          </Col>
          {/*<Col>
            <LookCard num="43" title="43" />
          </Col>*/}
        </Row>
      </div>
    );
  }
}

export default LooksPage;
