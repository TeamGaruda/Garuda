import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

import io from "socket.io-client";


const AdminRoute = ({ component: Component, ...rest }) => {
 
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthenticated().user.role === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
