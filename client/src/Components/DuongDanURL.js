import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRouter from '../ProtectingRouter/PrivateRouter';
import UnPrivateRouter from '../ProtectingRouter/UnPrivateRouter';
import Admin from './Admin';
import CreateProfile from './CreateProfile';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import Register from './Register';
import UpdateProfile from './UpdateProfile';

function DuongDanURL() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <UnPrivateRouter path="/login" component={Login} />
      <UnPrivateRouter path="/register" component={Register} />
      <PrivateRouter path="/profile" roles={['user']} component={Profile} />
      <PrivateRouter path="/admin" roles={['admin']} component={Admin} />
      <PrivateRouter path="/:id/createProfile" roles={['user']} component={CreateProfile} />
      <PrivateRouter path="/:name/updateProfile" roles={['user']} component={UpdateProfile} />
    </Switch>
  );
}

export default DuongDanURL;
