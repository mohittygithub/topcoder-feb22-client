import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { PATHS } from "./constants";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuth } = useSelector((state) => state.collections);
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /login page
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to={PATHS.LOGIN} />
      }
    />
  );
};

export default PrivateRoute;
