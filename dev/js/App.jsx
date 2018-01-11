
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router, Switch, Route } from 'react-router-dom'
import { detect } from 'detect-browser'
import WebFont from 'webfontloader'

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

  componentDidMount() {
    // Load all fonts
    WebFont.load({
      google: {
        families: [
          // 'Roboto:100,300,400,500,700,900',
          'Dosis:300,400,500,600,700,800',
          'Oxygen:300,400,700',
          // 'Ruda:400,700,900',
          'sans-serif'
        ]
      }
    })
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
