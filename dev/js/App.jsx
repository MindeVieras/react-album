
import React, { Component } from 'react'
import { Router, Switch, Route } from 'react-router-dom'

import PrivateRoute from './_components/PrivateRoute'
import Front from './_components/Front'
import Admin from './_components/Admin'
import Login from './_components/Login'
import Error404 from './_components/Errors/404'

import { history } from './_helpers'

import '../scss/base/normalize.scss'

export default class App extends Component {
  render() {
    return (
      <div>
        
        <Router history={history}>
          <Switch>
            <PrivateRoute exact path="/" component={Front} />
            <PrivateRoute path="/admin" component={Admin} />
            <Route exact path="/login" component={Login} />
            <Route component={Error404} />
          </Switch>
        </Router>

      </div>
    )
  }
}
