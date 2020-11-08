import { Col, Row } from "antd";
import React, { Component } from "react";
import jsonwebtoken from "jsonwebtoken";

import LookCard from "./LookCard";
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
                    _id
                    title
                    active
                    favorite
                    dateCreated
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
        .then((resData) => {
          console.log(resData);
        })
        .catch((err) => {
          console.log(err);
        });
    };

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
          this.context.refreshToken,
          this.context.userId
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
        .then((res) => {
          if ((res.status !== 200) & (res.status !== 201)) {
            throw new Error("Error when refreshing the token!");
          }
          return res.json();
        })
        .then((resData) => {
          if (resData.token) {
            this.context.login(
              resData.token,
              this.context.refreshToken,
              this.context.userId
            );
            console.log("auth-context ", this.state);
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
            <LookCard num="43" title="43" />
          </Col>
          <Col>
            <LookCard num="46" title="46" />
          </Col>
          <Col>
            <LookCard num="49" title="49" />
          </Col>
          <Col>
            <LookCard num="64" title="64" />
          </Col>
          <Col>
            <LookCard num="88" title="88" />
          </Col>
          <Col>
            <LookCard num="99" title="99" />
          </Col>
          <Col>
            <LookCard num="100" title="100" />
          </Col>
          <Col>
            <LookCard num="104" title="104" />
          </Col>
          <Col>
            <LookCard num="106" title="106" />
          </Col>
          <Col>
            <LookCard num="112" title="112" />
          </Col>
          <Col>
            <LookCard num="126" title="126" />
          </Col>
          <Col>
            <LookCard num="136" title="136" />
          </Col>
        </Row>
      </div>
    );
  }
}

export default LooksPage;
