import { Col, Row } from "antd";
import CheckToken from "../../helpers/CheckToken"
import React, { Component } from "react";

import LookCard from "./LookCard/LookCard";
import LookForm from "./LookForm/LookForm";
import AuthContext from "../../context/auth-context";

class LooksPage extends Component {

  state = {
    looks: [],
  }
  static contextType = AuthContext;

  componentDidMount() {
    this.loadLooks();
  }

  loadLooks() {
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
        const looks = resData.data.looks;
        this.setState({ looks: looks });
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  render() {

    const lookList = this.state.looks.map(look => {
      return (<Col key={look._Id}>
        <LookCard num={look.mediaUrl.replace('.jpg', '')} title={look.mediaUrl.replace('.jpg', '')} />
      </Col>);
    })

    return (
      <div>
        <CheckToken />
        <Row justify={"space-around"}>
          <Col>
            <LookForm />
          </Col>
          {lookList}
        </Row>
      </div>
    );
  }
}

export default LooksPage;
