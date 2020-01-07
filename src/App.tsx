import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router, Switch, Route } from 'react-router-dom'
import WebFont from 'webfontloader'

import PrivateRoute from './components/PrivateRoute'
import Login from './components/Login'
import Main from './components/Main'
import Error404 from './components/404'

import { history } from './helpers'
import { setClientDimensions } from './actions'

interface IAppProps {
  // setClientDimensions: typeof setClientDimensions
  setClientDimensions: Function
}

/**
 * this is main App component
 * @module App
 *
 */
class App extends Component<IAppProps> {
  /**
   * constructor description
   * @param {Object} props props to pass
   */
  constructor(props: IAppProps) {
    super(props)

    // Load all fonts
    WebFont.load({
      google: {
        families: [
          'Roboto:100,300,400,500,700,900',
          // 'Dosis:300,400,500,600,700,800',
          // 'Oxygen:300,400,700',
          // 'Ruda:400,700,900',
          // 'sans-serif'
        ],
      },
    })

    // Set initial client dimensions.
    props.setClientDimensions()
    // Update client dimensions on window resize.
    window.addEventListener('resize', this.updateDimensions.bind(this))
  }

  // Update state with new dimensions.
  updateDimensions() {
    this.props.setClientDimensions()
  }

  /**
   * Render DOM.
   * @private
   *
   * @return {JSX.Element}
   *   Jsx html element.
   */
  render() {
    return (
      <Router history={history}>
        <Switch>
          <PrivateRoute component={Main} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute component={Error404} />
        </Switch>
      </Router>
    )
  }
}

export default connect(null, { setClientDimensions })(App)
