import { Col, Row } from "antd";
import CheckToken from "../../helpers/CheckToken"
import React, { Component } from "react";

//import LookCard from "./LookCard";
import LookForm from "./LookForm";
import AuthContext from "../../context/auth-context";

import "./Looks.css";

class LooksPage extends Component {

  static contextType = AuthContext;

  loadLooks(userId) {
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
      .then(resData => {
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.loadLooks();
  }

  render() {
    return (
      <div>
        <CheckToken />
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
