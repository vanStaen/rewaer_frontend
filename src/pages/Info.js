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
            The Fashion App for minimalistic and sustainable geniuses! <br/> Renew
            your garderobe without buying: only trees should get new leaves every
            years.
          </Text>
        </Paragraph>
        <Paragraph
          copyable={{
            text: "admin@rewear.com",
            tooltips: ["Copy email", "Email copied!"],
          }}
        >
          Please address any questions/comments to <b>admin@rewear.com.</b>
        </Paragraph>

        <Divider orientation="left" plain>
          What is Rewær?
        </Divider>
        <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: "more" }}>
          Rewær is promoting green fashion based on the principle that{" "}
          <span style={{ background: "#C8D6CF" }}>
            the most sustainable piece of clothing is the one you already have
          </span>
          . Offered as a multiplatform application: Web, iOS and Android. It
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
        Fashion accounts for around 10% of greenhouse gas emissions from human activity,
        but <span style={{ background: "#C8D6CF" }}>
        there are ways to reduce the impact your wardrobe has on the climate</span>. Not buying 
        new clothes you don't need is one of those solution. Or buying quality things that will last. 
        Or simply getting items you can combine with the stuff you already have, and avoid having unworn
        brandnew stuff laying around forever in your drawer. But also, {" "}
        <span style={{ background: "#C8D6CF" }}>
          Rewær is your own stylist
        </span>: by keepingtrack of your favorite styles and items, it will help you get dress, 
        wear stuff you like but never think
        of wearing, and get your friends to help! Wihtout buying anything new, you will rediscover your own
        clothes, and have the feeling of a brand new garderobe, without spending a cent!{" "}
        </Paragraph>

        <Divider orientation="left" plain>
          How far are we?
        </Divider>
        <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: "more" }}>
          We are still working on the first version, with the minimum viables feature. 
          The first prototype will be open of any willing beta tester!{" "}
        <span style={{ background: "#C8D6CF" }}>You can already create an account
        </span>,
          and we will ping out when it's ready for testing! The first feature includes
          the main garderobe functions: mangement of <em>Items</em> and <em>Looks</em>.
        </Paragraph>

        {/*
        <Divider orientation="left" plain>
          Sustainable fashion
        </Divider>
        <Paragraph>
          https://www.sustainablefashionmatterz.com/what-is-sustainable-fashion
        </Paragraph>   
        */}     
        

        <Divider />
        <Paragraph disabled>
          Application running on the {process.env.NODE_ENV} environement.<br/>
          Backend in use is {process.env.REACT_APP_API_URL}.
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
