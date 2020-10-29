import React, { Component } from "react";
import AuthContext from "../context/auth-context";
import { NavLink } from "react-router-dom";
import { Menu, Avatar, Badge } from "antd";
import {
  UserOutlined,
  CameraOutlined,
  SkinOutlined,
  TeamOutlined,
  MailOutlined,
  QuestionOutlined,
} from "@ant-design/icons";

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: null,
    };
  }

  static contextType = AuthContext;

  handleClick = (e) => {
    console.log("click ", e);
    this.setState({ current: e.key });
  };

  render() {
    console.log();
    const { current } = this.state;
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        style={{ margin: "5px 0px" }}
      >
        <span
          style={{
            color: "#6C917D",
            float: "left",
            margin: "0px 20px 0px 20px",
          }}
        >
          Rewær, the green Fashion App
        </span>
        {this.context.token ? (
          <Menu.Item key="profile" style={{ float: "right" }}>
            <NavLink to="/profile">
              <Badge count={5} offset={[0, 5]}>
                <Avatar
                  src="https://avatars0.githubusercontent.com/u/12551446?s=460"
                  size="large"
                />
              </Badge>
            </NavLink>
          </Menu.Item>
        ) : (
          <Menu.Item
            key="auth"
            icon={<UserOutlined />}
            style={{ float: "right" }}
          >
            <NavLink to="/auth"> Login</NavLink>
          </Menu.Item>
        )}
        <Menu.Item
          key="looks"
          icon={<CameraOutlined />}
          disabled={!this.context.token}
          style={{ float: "left" }}
        >
          <NavLink to="/looks"> Looks</NavLink>
        </Menu.Item>
        <Menu.Item
          key="items"
          icon={<SkinOutlined />}
          disabled={!this.context.token}
          style={{ float: "left" }}
        >
          <NavLink to="/items"> Items</NavLink>
        </Menu.Item>
        <Menu.Item
          key="mail"
          icon={<MailOutlined />}
          disabled
          style={{ float: "left" }}
        >
          <NavLink to="/mail"> Mail</NavLink>
        </Menu.Item>
        <Menu.Item
          key="friends"
          icon={<TeamOutlined />}
          disabled
          style={{ float: "left" }}
        >
          <NavLink to="/friends"> Friends</NavLink>
        </Menu.Item>
        <Menu.Item key="info" style={{ float: "left" }}>
          <NavLink to="/info">
            &nbsp;&nbsp;
            <QuestionOutlined />
          </NavLink>
        </Menu.Item>
      </Menu>
    );
  }
}

export default MenuBar;
