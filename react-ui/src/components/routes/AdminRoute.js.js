import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";

/**
 * @description: Route for authenticated users. They should be redirected to the
 * dashboard once the token is invalid or not existant
 */

const AdminRoute = ({ component: Component, ...rest }) => {
  const [token] = useState(window.localStorage.getItem("token"));

  return <Route {...rest} render={(props) => (token ? <Component {...props} /> : <Redirect to="/" />)} />;
};

export default AdminRoute;
