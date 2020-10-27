import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import {
  UserOutlined,
  CameraOutlined,
  SkinOutlined,
  TeamOutlined,
  MailOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

class MainMenu extends Component {
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
      >
        <Menu.Item key="auth" icon={<UserOutlined />}>
          <NavLink to="/auth"> Authenticate</NavLink>
        </Menu.Item>
        <Menu.Item key="looks" icon={<CameraOutlined />}>
          <NavLink to="/looks"> Looks</NavLink>
        </Menu.Item>
        <Menu.Item key="items" icon={<SkinOutlined />}>
          <NavLink to="/items"> Items</NavLink>
        </Menu.Item>
        <Menu.Item key="mail" icon={<TeamOutlined />} disabled>
          <NavLink to="/mail"> Mail</NavLink>
        </Menu.Item>
        <Menu.Item key="friends" icon={<MailOutlined />} disabled>
          <NavLink to="/friends"> Friends</NavLink>
        </Menu.Item>
      </Menu>
    );
  }
}

export default MainMenu;
