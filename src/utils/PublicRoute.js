import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { PATHS } from "./constants";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const { isAuth } = useSelector((state) => state.collections);

  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        isAuth && restricted ? (
          <Redirect to={PATHS.HOME} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
