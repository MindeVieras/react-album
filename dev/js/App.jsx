
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

    this.state = {
      width:  800,
      height: 182
    }
    // Set browser info into state
    const browser = detect()
    props.dispatch(clientActions.setBrowser(browser))
  }

  componentDidMount() {
    // Add resize event listener
    this.updateDimensions()
    window.addEventListener("resize", this.updateDimensions.bind(this))
  }

  componentWillUnmount() {
    // Remove resize event listener
    window.removeEventListener("resize", this.updateDimensions.bind(this))
  }

  // Calculate & Update state of new dimensions
  updateDimensions() {
    const { dispatch } = this.props
    let width = window.innerWidth
    let height = window.innerHeight
    let orientation = 'landscape'
    if (width < height) {
      orientation = 'portrait'
    }
    dispatch(clientActions.setScreen({ width, height, orientation }))
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
