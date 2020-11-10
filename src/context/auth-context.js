import React from "react";

export default React.createContext({
  token: null,
  refreshToken: null,
  login: (token) => {},
  logout: () => {},
});
