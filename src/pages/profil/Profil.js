import React, { Component } from "react";
import { authStore } from '../../stores/authStore';
import { Typography } from "antd";
const { Title, Paragraph } = Typography;


class ProfilPage extends Component {

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
                text: authStore.token,
                tooltips: ["Copy token", "Token copied!"],
              }}
            >
              <b>Access Token : </b>{authStore.token}
            </Paragraph>
            <Paragraph
              copyable={{
                text: authStore.refreshToken,
                tooltips: ["Copy refresh token", "Refresh Token copied!"],
              }}
            >
              <b>Refresh Token : </b>{authStore.refreshToken}
            </Paragraph>
          </div>
        )}

      </div>
    );
  }
}

export default ProfilPage;
