import { Image, Card, Col, Row } from "antd";
import React, { Component } from "react";
import AuthContext from "../../context/auth-context";

import "./Looks.css";

const { Meta } = Card;

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

    return (
      <div>
        {loadLooks()}
        <Row justify={"space-around"}>
          <Col>
            <Card
              hoverable
              bordered
              style={{ width: 240, marginBottom: 30 }}
              cover={
                <Image
                  alt="example"
                  src="https://rewaer-backend.herokuapp.com/uploads/43.jpg"
                  placeholder={
                    <Image
                      src="https://rewaer-backend.herokuapp.com/uploads/43_thumb.jpg"
                      width={240}
                    />
                  }
                />
              }
            >
              <Meta title="Cold days 2019" />
            </Card>
          </Col>
          <Col>
            <Card
              hoverable
              style={{ width: 240, marginBottom: 30 }}
              cover={
                <Image
                  alt="example"
                  src="https://rewaer-backend.herokuapp.com/uploads/46.jpg"
                  placeholder={
                    <Image
                      src="https://rewaer-backend.herokuapp.com/uploads/46_thumb.jpg"
                      width={240}
                    />
                  }
                />
              }
            >
              <Meta title="Casual smart 2020" />
            </Card>
          </Col>
          <Col>
            <Card
              hoverable
              style={{ width: 240, marginBottom: 30 }}
              cover={
                <img
                  alt="example"
                  src="https://rewaer-backend.herokuapp.com/uploads/49.jpg"
                />
              }
            >
              <Meta title="Casual smart 2020" />
            </Card>
          </Col>
          <Col>
            <Card
              hoverable
              style={{ width: 240, marginBottom: 30 }}
              cover={
                <img
                  alt="example"
                  src="https://rewaer-backend.herokuapp.com/uploads/64.jpg"
                />
              }
            >
              <Meta title="Casual smart 2020" />
            </Card>
          </Col>
          <Col>
            <Card
              hoverable
              style={{ width: 240, marginBottom: 30 }}
              cover={
                <img
                  alt="example"
                  src="https://rewaer-backend.herokuapp.com/uploads/88.jpg"
                />
              }
            >
              <Meta title="Casual smart 2020" />
            </Card>
          </Col>
          <Col>
            <Card
              hoverable
              style={{ width: 240, marginBottom: 30 }}
              cover={
                <img
                  alt="example"
                  src="https://rewaer-backend.herokuapp.com/uploads/99.jpg"
                />
              }
            >
              <Meta title="Casual smart 2020" />
            </Card>
          </Col>
          <Col>
            <Card
              hoverable
              style={{ width: 240, marginBottom: 30 }}
              cover={
                <img
                  alt="example"
                  src="https://rewaer-backend.herokuapp.com/uploads/100.jpg"
                />
              }
            >
              <Meta title="Casual smart 2020" />
            </Card>
          </Col>
          <Col>
            <Card
              hoverable
              style={{ width: 240, marginBottom: 30 }}
              cover={
                <img
                  alt="example"
                  src="https://rewaer-backend.herokuapp.com/uploads/104.jpg"
                />
              }
            >
              <Meta title="Casual smart 2020" />
            </Card>
          </Col>
          <Col>
            <Card
              hoverable
              style={{ width: 240, marginBottom: 30 }}
              cover={
                <img
                  alt="example"
                  src="https://rewaer-backend.herokuapp.com/uploads/106.jpg"
                />
              }
            >
              <Meta title="Casual smart 2020" />
            </Card>
          </Col>
          <Col>
            <Card
              hoverable
              style={{ width: 240, marginBottom: 30 }}
              cover={
                <img
                  alt="example"
                  src="https://rewaer-backend.herokuapp.com/uploads/112.jpg"
                />
              }
            >
              <Meta title="Casual smart 2020" />
            </Card>
          </Col>
          <Col>
            <Card
              hoverable
              style={{ width: 240, marginBottom: 30 }}
              cover={
                <img
                  alt="example"
                  src="https://rewaer-backend.herokuapp.com/uploads/136.jpg"
                />
              }
            >
              <Meta title="Casual smart 2020" />
            </Card>
          </Col>
          <Col>
            <Card
              hoverable
              style={{ width: 240, marginBottom: 30 }}
              cover={
                <img
                  alt="example"
                  src="https://rewaer-backend.herokuapp.com/uploads/126.jpg"
                />
              }
            >
              <Meta title="Casual smart 2020" />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default LooksPage;
