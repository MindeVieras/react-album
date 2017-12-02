
import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { PrivateRoute, LoginPage } from './_components';
import BaseLayout from './_components/BaseLayout';
import { history } from './_helpers';

import '../scss/app/main.scss';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <PrivateRoute component={BaseLayout} />
          </Switch>
        </Router>
      </div>
    );
  }
}
