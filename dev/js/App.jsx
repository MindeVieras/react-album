
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router, Switch, Route } from 'react-router-dom'
import { detect } from 'detect-browser'
import PrivateRoute from './_components/PrivateRoute'
import Front from './_components/Front'
import Admin from './_components/Admin'
import Login from './_components/Login'
import Error404 from './_components/Errors/404'

import { history } from './_helpers'
import { clientActions } from './_actions'

import '../scss/base/normalize.scss'

class App extends Component {

  constructor(props) {
    super(props)

    // Set browser info into state
    const browser = detect()
    props.dispatch(clientActions.setBrowser(browser))
  }

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

export default connect()(App)
