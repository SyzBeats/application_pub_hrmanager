import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";

/**
 * @description: not authenticated users should see the login route
 * otherwise, they will be forwarded to the dashboard
 */

const LoginRoute = ({ component: Component, ...rest }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    setToken(window.localStorage.getItem("token"));
  }, [token]);

  return <Route {...rest} render={(props) => (token ? <Redirect to="/dashboard" /> : <Component {...props} />)} />;
};

export default LoginRoute;
