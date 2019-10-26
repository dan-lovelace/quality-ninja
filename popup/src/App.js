import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Home from './components/Home';
import Edit from './components/Edit';

import history from './utils/history';

const App = () => (
  <Router history={history}>
    <Switch>
      <Route path='/popup' component={Home} />
      <Route path='/edit/:type' component={Edit} />
      <Route path='*' component={() => <div>Not found</div>} />
    </Switch>
  </Router>
);

export default App;
