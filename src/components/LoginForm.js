import React, { Component } from "react";
import AuthContext from "../context/auth-context";
import { Form, Input, Button, Checkbox } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

import "./LoginForm.css";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
    };
  }

  static contextType = AuthContext;

  switchModeHandler = () => {
    this.setState((prevState) => {
      return { isLogin: !prevState.isLogin };
    });
  };

  render() {
    const submitHandler = (values) => {
      const email = values.email;
      const password = values.password;

      let requestBody = {
        query: `
            query {
              login(email:"${email}",password:"${password}"){
                userId
                token
                tokenExpiration
              }
            }
            `,
      };

      if (!this.state.isLogin) {
        const username = values.username;
        requestBody = {
          query: `
              mutation {
                  createUser(
                    userInput: { name: "${username}", email: "${email}", password: "${password}" }
                  ) {
                    name
                  }
                }
                `,
        };
      }

      fetch(process.env.REACT_APP_API_URL, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if ((res.status !== 200) & (res.status !== 201)) {
            throw new Error("Login Failed!");
          }
          return res.json();
        })
        .then((resData) => {
          if (resData.data.login.token) {
            this.context.login(
              resData.data.login.token,
              resData.data.login.userId,
              resData.data.login.tokenExpiration
            );
            localStorage.setItem("token", resData.data.login.token);
            localStorage.setItem("userId", resData.data.login.userId);
            console.log(resData);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return (
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={submitHandler}
      >
        <Form.Item
          name="username"
          hidden={this.state.isLogin}
          rules={[
            {
              required: !this.state.isLogin,
              message: "How should we call you?",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Name"
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="input Password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item hidden={!this.state.isLogin}>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="/#">
            Recover password
          </a>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            {this.state.isLogin ? "Log in" : "Create account"}
          </Button>
          Or{" "}
          <span
            style={{ color: "#6C917D", cursor: "pointer" }}
            onClick={this.switchModeHandler}
          >
            {this.state.isLogin ? "register now!" : "log into your account!"}
          </span>
        </Form.Item>
      </Form>
    );
  }
}

export default LoginForm;
