import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Users } from '../views/users';
import { Login } from '../views/login';

import { Dashboard } from '../views/Dashboard';
import { Projects } from '../views/projects';

export const Router = () => {
  return (
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/dashboard' component={Dashboard} />
      <Route exact path='/users' component={Users} />
      <Route exact path='/projects' component={Projects} />
    </Switch>
  );
};
