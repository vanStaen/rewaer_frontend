import { Card, Col, Row } from "antd";
import React, { Component } from "react";

const { Meta } = Card;

class LooksPage extends Component {
  render() {
    return (
      <div>
        <Row justify={"space-around"}>
          <Col>
            <Card
              hoverable
              bordered
              style={{ width: 240, marginBottom: 30 }}
              cover={
                <img
                  alt="example"
                  src="https://rewaer-backend.herokuapp.com/uploads/43.jpg"
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
                  src="https://rewaer-backend.herokuapp.com/uploads/46.jpg"
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
