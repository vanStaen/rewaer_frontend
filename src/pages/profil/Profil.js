import React, { Component } from "react";
import AuthContext from "../../context/auth-context";
import { Typography } from "antd";
const { Title, Paragraph } = Typography;


class ProfilPage extends Component {

  static contextType = AuthContext;

  componentDidMount() {
    //this.context.getNewToken();
  }

  render() {

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userId = localStorage.getItem("userId");

    return (
      <div>
        <Title level={3}>Hello, {storedUser ? storedUser.name : 'there'}
        </Title>
        <Paragraph copyable>
          <b>User ID:</b> {userId}
        </Paragraph>
        { process.env.NODE_ENV === "development" && (
          <div>

            <Paragraph
              copyable={{
                text: this.context.token,
                tooltips: ["Copy token", "Token copied!"],
              }}
            >
              <b>Access Token : </b>{this.context.token}
            </Paragraph>
            <Paragraph
              copyable={{
                text: this.context.refreshToken,
                tooltips: ["Copy refresh token", "Refresh Token copied!"],
              }}
            >
              <b>Refresh Token : </b>{this.context.refreshToken}
            </Paragraph>
          </div>
        )}

      </div>
    );
  }
}

export default ProfilPage;
