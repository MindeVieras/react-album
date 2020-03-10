import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { setTranslations } from 'redux-i18n'
import WebFont from 'webfontloader'

import PrivateRoute from './components/PrivateRoute'
import Login from './components/Login'
import Albums from './components/Albums/Albums'
import Users from './components/Users/Users'
import Trash from './components/Trash/Trash'
import Error404 from './components/404'

import { setClientDimensions } from './actions'
import { translations } from './translations'

interface IAppProps {
  setClientDimensions: Function
  setTranslations: typeof setTranslations
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

    // Set translations - the asynchronous way.
    props.setTranslations(translations)

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
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Albums} />
          <PrivateRoute path="/users" component={Users} />
          <PrivateRoute path="/trash" component={Trash} />
          <Route path="/login" component={Login} />
          <PrivateRoute component={Error404} />
        </Switch>
      </Router>
    )
  }
}

export default connect(null, { setClientDimensions, setTranslations })(App)
