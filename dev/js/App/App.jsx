
import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { PrivateRoute, LoginPage, BaseLayout } from '../_components';
import { history } from '../_helpers';

import '../../scss/app/main.scss';

export class App extends React.Component {

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
