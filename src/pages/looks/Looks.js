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
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta title="Casual smart 2020" />
            </Card>
          </Col>
          <Col>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta title="Casual smart 2020" />
            </Card>
          </Col>
          <Col>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta title="Casual smart 2020" />
            </Card>
          </Col>
          <Col>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
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
