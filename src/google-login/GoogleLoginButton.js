import React, { Fragment, useEffect, useContext } from "react";
import { GoogleLogin } from "react-google-login";
import { clientId, userInfo } from "./googleUtil";

const GoogleLoginButton = () => {
  const { state: userInfoState, dispatch } = useContext(userInfo);

  const onSuccess = (res) => {
    dispatch({ type: "LOGIN", payload: res.profileObj });
    // console.log(state);
    console.log(userInfoState);
    console.log("[Login Success] current user:", res.profileObj);
  };

  const onFailure = (res) => {
    console.log("[Login failed] res:", res);
  };

  return (
    <Fragment>
      {!userInfoState.loggedIn &&
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      }
    </Fragment>
  );
};

export default GoogleLoginButton;
