import { Col, Row } from "antd";
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
                  _id
                  title
                  active
                  favorite
                  mediaUrl
                }
              }
              `,
    };

    async function fetchLooks(token) {
      const response = await fetch(process.env.REACT_APP_API_URL, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if ((response.status !== 200) & (response.status !== 201)) {
        throw new Error("Unauthenticated!");
      }
      const looks = await response.json();
      return looks;
    }
    // fetch Looks
    fetchLooks(this.context.token).then((resData) => {
      const looks = resData.data.looks;
      this.setState({ looks: looks });
    }
    ).catch(error => {
      console.log(error.message);
    });
  };


  render() {
    const lookList = this.state.looks.map(look => {
      const mediaUrl = look.mediaUrl.replace('.jpg', '');
      return (<Col key={look._id}>
        <LookCard num={mediaUrl} title={"#" + mediaUrl} />
      </Col>);
    })
    return (
      <div>
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
