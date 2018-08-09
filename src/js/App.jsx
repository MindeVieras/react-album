
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setLanguage } from 'redux-i18n'
import { Router, Switch, Route } from 'react-router-dom'
import locale from 'browser-locale'
import { detect } from 'detect-browser'
import WebFont from 'webfontloader'

import PrivateRoute from './_components/PrivateRoute'
import Login from './_components/Login'
import Front from './_components/Front'
import Admin from './_components/Admin'
import Error404 from './_components/404'

import { history } from './_helpers'
import { clientActions, utilsActions } from 'Actions'

class App extends Component {

  constructor(props) {
    super(props)

    // Get App settings
    props.dispatch(utilsActions.getAppSettings())

    // Set browser info into state
    let allowedLocales = ['en', 'lt', 'ru']
    let l = 'en'

    if (allowedLocales.includes(locale())) {
      l = locale()
    }

    props.dispatch(setLanguage(l))
    const browser = detect()
    props.dispatch(clientActions.setBrowser(browser))
    props.dispatch(clientActions.setCurrentLocation())
  }

  componentDidMount() {
    // Load all fonts
    WebFont.load({
      google: {
        families: [
          'Roboto:100,300,400,500,700,900',
          // 'Dosis:300,400,500,600,700,800',
          // 'Oxygen:300,400,700',
          // 'Ruda:400,700,900',
          // 'sans-serif'
        ]
      }
    })

    // Add resize event listener
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions.bind(this))
  }

  componentWillUnmount() {
    // Remove resize event listener
    window.removeEventListener('resize', this.updateDimensions.bind(this))
  }

  // Calculate & Update state of new dimensions
  updateDimensions() {
    const { dispatch } = this.props
    let width = window.innerWidth
    let height = window.innerHeight
    let orientation = (width < height) ? 'portrait' : 'landscape'
    dispatch(clientActions.setScreen({ width, height, orientation }))
  }

  render() {
    return (
      <Router history={ history }>
        <Switch>
          <PrivateRoute exact path="/" component={ Front } />
          <PrivateRoute path="/admin" component={ Admin } />
          <Route path="/login" component={ Login } />
          <PrivateRoute component={ Error404 } />
        </Switch>
      </Router>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(App)
