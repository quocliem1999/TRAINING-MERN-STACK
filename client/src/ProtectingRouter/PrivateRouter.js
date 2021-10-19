import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { AuthContext } from '../Context/AuthContext';

const PrivateRouter = ({ component: Component, roles, ...rest }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated)
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
        if (!roles.includes(user.role))
          return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRouter;
