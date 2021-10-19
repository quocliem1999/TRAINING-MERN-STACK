import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { AuthContext } from '../Context/AuthContext';

const UnPrivateRouter = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated)
          return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
        return <Component {...props} />;
      }}
    />
  );
};

export default UnPrivateRouter;
