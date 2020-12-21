import { Col, Row, Spin } from "antd";
import React, { Component } from "react";
import axios from 'axios';

import LookCard from "./LookCard/LookCard";
import LookForm from "./LookForm/LookForm";
import AuthContext from "../../context/auth-context";

import "./Looks.css";

class LooksPage extends Component {

  state = {
    looks: [],
    isLoading: true,
  }
  static contextType = AuthContext;

  async componentDidMount() {
    this.context.getNewToken();
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
      const response = await axios({
        url: process.env.REACT_APP_API_URL,
        method: "POST",
        data: requestBody,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if ((response.status !== 200) & (response.status !== 201)) {
        throw new Error("Unauthenticated!");
      }
      const looks = await response.data;
      return looks;
    }
    // fetch Looks
    fetchLooks(this.context.token).then((resData) => {
      const looks = resData.data.looks;
      this.setState({ looks: looks });
      this.setState({ isLoading: false });
    }
    ).catch(error => {
      console.log(error.message);
    });
  };


  render() {
    const lookList = this.state.looks.map(look => {
      return (<Col key={look._id}>
        <LookCard look={look} />
      </Col>);
    })
    return (
      <div>
        { this.state.isLoading ?
          <div className="looks__spinner">
            <Spin size="large" />
          </div>
          :
          (<Row justify={"space-around"}>
            <Col>
              <LookForm />
            </Col>
            {lookList}
          </Row>)
        }

      </div>
    );
  }
}

export default LooksPage;
