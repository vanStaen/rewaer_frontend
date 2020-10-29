import React, { Component } from "react";
import { Typography } from "antd";

const { Title, Paragraph, Text } = Typography;

class InfoPage extends Component {
  render() {
    return (
      <div>
        <Title level={2}>Rewær, the green Fashion App</Title>
        <Paragraph>
          <Text type="secondary">
            The Fashion App for minimalistic and sustainable geniuses! Renew
            your style without buying: only trees should get new leaves every
            years.
          </Text>
        </Paragraph>
        <Paragraph copyable={{ text: "admin@rewear.com" }}>
          Please address any questions/comments to{" "}
          <a href="mailto:admin@rewear.com">admin@rewear.com</a>.
        </Paragraph>

        <Title level={5}>What is rewaer?</Title>
        <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: "more" }}>
          Renew your style without buying: only trees should get new leaves
          every years.{" "}
          <Text mark>
            Renew your style without buying: only trees should get new leaves
            every years.
          </Text>{" "}
          Renew your style without buying: only trees should get new leaves
          every years. Renew your style without buying: only trees should get
          new leaves every years. Renew your style without buying: only trees
          should get new leaves every years. Renew your style without buying:
          only trees should get new leaves every years. Renew your style without
          buying: only trees should get new leaves every years. Renew your style
          without buying: only trees should get new leaves every years. Renew
          your style without buying: only trees should get new leaves every
          years. Renew your style without buying: only trees should get new
          leaves every years. Renew your style without buying: only trees should
          get new leaves every years.
        </Paragraph>

        <Title level={5}>Why is rewaer?</Title>
        <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: "more" }}>
          Renew your style without buying: only trees should get new leaves
          every years. Renew your style without buying: only trees should get
          new leaves every years. Renew your style without buying: only trees
          should get new leaves every years.
          <Text strong>
            Renew your style without buying: only trees should get new leaves
            every years.
          </Text>{" "}
          Renew your style without buying: only trees should get new leaves
          every years. Renew your style without buying: only trees should get
          new leaves every years. Renew your style without buying: only trees
          should get new leaves every years. Renew your style without buying:
          only trees should get new leaves every years. Renew your style without
          buying: only trees should get new leaves every years. Renew your style
          without buying: only trees should get new leaves every years. Renew
          your style without buying: only trees should get new leaves every
          years.
        </Paragraph>

        <Title level={5}>how far is rewaer?</Title>
        <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: "more" }}>
          Renew your style without buying: only trees should get new leaves
          every years. Renew your style without buying: only trees should get
          new leaves every years. Renew your style without buying: only trees
          should get new leaves every years. Renew your style without buying:
          only trees should get new leaves every years. Renew your style without
          buying: only trees should get new leaves every years. Renew your style
          without buying: only trees should get new leaves every years. Renew
          your style without buying: only trees should get new leaves every
          years. Renew your style without buying: only trees should get new
          leaves every years. Renew your style without buying: only trees should
          get new leaves every years. Renew your style without buying: only
          trees should get new leaves every years. Renew your style without
          buying: only trees should get new leaves every years.
        </Paragraph>
      </div>
    );
  }
}

export default InfoPage;
