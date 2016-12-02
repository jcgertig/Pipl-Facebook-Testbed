import React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

import Base from './handlers/Base';
import Home from'./handlers/Home';
import App from './handlers/App';
import NotFound from './handlers/NotFound';

var routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Base}>
      <IndexRoute component={Home} />
      <Route path="login" component={Home} />
      <Route path="app" component={App} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

export default routes;
