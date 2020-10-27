import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Avatar, Badge } from "antd";
import {
  UserOutlined,
  CameraOutlined,
  SkinOutlined,
  TeamOutlined,
  MailOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

class MenuBar extends Component {
  state = {
    current: "mail",
  };

  handleClick = (e) => {
    console.log("click ", e);
    this.setState({ current: e.key });
  };

  render() {
    const { current } = this.state;
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        style={{ color: "#6C917D", margin: "5px 0px" }}
      >
        <Menu.Item key="profile">
          <Badge count={0} offset={[0, 5]}>
            <Avatar
              src="https://avatars0.githubusercontent.com/u/12551446?s=460"
              size="large"
            />
          </Badge>
        </Menu.Item>
        <Menu.Item key="auth" icon={<UserOutlined />}>
          <NavLink to="/auth"> Authenticate</NavLink>
        </Menu.Item>
        <Menu.Item key="looks" icon={<CameraOutlined />}>
          <NavLink to="/looks"> Looks</NavLink>
        </Menu.Item>
        <Menu.Item key="items" icon={<SkinOutlined />}>
          <NavLink to="/items"> Items</NavLink>
        </Menu.Item>
        <Menu.Item key="mail" icon={<MailOutlined />} disabled>
          <NavLink to="/mail"> Mail</NavLink>
        </Menu.Item>
        <Menu.Item key="friends" icon={<TeamOutlined />} disabled>
          <NavLink to="/friends"> Friends</NavLink>
        </Menu.Item>
      </Menu>
    );
  }
}

export default MenuBar;
