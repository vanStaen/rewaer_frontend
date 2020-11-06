import React from "react";

export default React.createContext({
  token: null,
  userId: null,
  refreshtoken: null,
  login: (token, refreshToken, userId) => {},
  logout: () => {},
});
