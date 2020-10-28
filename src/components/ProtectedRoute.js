import React from 'react';
import { Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props  }) => {
  return (
    <Route>
      {
        () => props.loggedIn ? <Component {...props} /> : null
      }
    </Route>
)}

export default ProtectedRoute;
