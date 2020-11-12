import { Component } from "react";
import AuthContext from "../context/auth-context";
import jsonwebtoken from "jsonwebtoken";

class CheckToken extends Component {

    static contextType = AuthContext;

    componentDidMount() {
        this.checkToken();
    }

    checkToken() {

        if (process.env.NODE_ENV === "development") {
            console.log("[Script] Check access token");
        }

        // Check if refreshtoken is expired
        if (this.context.refreshToken) {
            let decodedRefreshToken = jsonwebtoken.decode(this.context.refreshToken, {
                complete: true,
            });
            let dateNow = new Date();
            if (decodedRefreshToken.exp < Math.floor(dateNow.getTime() / 1000)) {
                console.log("REFRESH TOKEN HAS EXPIRED!");
                this.context.logout();
            }
        }

        // Check if token is expired
        if (this.context.token) {
            let decodedToken = jsonwebtoken.decode(this.context.token, {
                complete: true,
            });
            let dateNow = new Date();
            if (decodedToken.exp < Math.floor(dateNow.getTime() / 1000)) {
                console.log("TOKEN HAS EXPIRED!");
                this.context.login(
                    null,
                    this.context.refreshToken
                );
            }
        }

        // Refresh token is token missing
        if (!this.context.token) {
            let requestBody = { refreshToken: this.context.refreshToken };
            fetch(process.env.REACT_APP_AUTH_URL + "/token", {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                    if (res.status !== 201) {
                        throw new Error("Error when refreshing the token!");
                    }
                    return res.json();
                })
                .then((resData) => {
                    localStorage.setItem("refreshToken", resData.refreshToken);
                    if (resData.token) {
                        this.context.login(
                            resData.token,
                            resData.refreshToken
                        );
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    render() {
        return null;
    }
}

export default CheckToken;
