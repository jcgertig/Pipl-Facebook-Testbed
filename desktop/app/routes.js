// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginPage} />
    <Route path="login" component={LoginPage} />
    <Route path="app" component={HomePage} />
  </Route>
);
