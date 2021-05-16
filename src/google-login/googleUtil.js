import React, { useState, createContext, useReducer } from "react";

const clientId =
  "1028496110000-rube10ejr6boevdfk683nuslmco1fvcq.apps.googleusercontent.com";

const userInfo = createContext({});
const { Provider } = userInfo;

const UserInfoProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          loggedIn: true,
          userInfo: action.payload,
        };
      case "LOGOUT":
        return {
          loggedIn: false,
          userInfo: {}
        };
      default:
        throw new Error();
    }
  }, {});

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { clientId, userInfo, UserInfoProvider };
