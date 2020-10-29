import React, { Component } from "react";
import { Typography, Divider } from "antd";

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
        <Paragraph
          copyable={{
            text: "admin@rewear.com",
            tooltips: ["Copy email", "Email copied!"],
          }}
        >
          Please address any questions/comments to admin@rewear.com.
        </Paragraph>

        <Divider orientation="left" plain>
          What is Rewær?
        </Divider>
        <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: "more" }}>
          Rewær is promoting green fashion based on the principle that{" "}
          <span style={{ background: "#C8D6CF" }}>
            the most sustainable piece of clothing is the one you already have
          </span>
          . Offered as a multiplatform application: - Web, iOS and Android. It
          aim to help at organising your garderobe, keep track of your favorite
          style and helps you discover new combination to wear the clothes you
          already have. It has two main components: fashion organisator and
          social media. Those two are linked as you can authorise friends to
          have a look in your garderobe to help you create looks based on your
          items. You can also use the app to open your garderobe in-real-life
          and share items with your hand pick best friends.
        </Paragraph>

        <Divider orientation="left" plain>
          Why do you need it?
        </Divider>
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

        <Divider orientation="left" plain>
          How far are we?
        </Divider>
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

        <Divider orientation="left" plain>
          Debuging
        </Divider>

        <Paragraph>
          You are running this application in {process.env.NODE_ENV} mode,
          linked with {process.env.REACT_APP_API_URL}.
        </Paragraph>

        {/*
        <Text type="secondary">
          Rewær
          <Divider type="vertical" />
          Berlin
          <Divider type="vertical" />
          ©2020 All Rights Reserved
        </Text>
        */}
      </div>
    );
  }
}

export default InfoPage;
