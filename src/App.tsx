import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router, Switch, Route } from 'react-router-dom'
import { setTranslations } from 'redux-i18n'
import { Helmet } from 'react-helmet'
import WebFont from 'webfontloader'

import { PrivateRoute, LoginPage, AlbumsPage, TrashPage, Error404 } from './components'
import UsersPage from './components/Page/Users/UsersPage'

import { history } from './helpers'
import { setClientDimensions } from './actions'
import { translations } from './translations'
import { IStoreState } from './reducers'

interface IAppProps {
  appTitle?: string
  appName: string
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
   * Initialize the App.
   *
   * @param {IAppProps} props
   *   Props to pass.
   */
  constructor(props: IAppProps) {
    super(props)

    // Load all fonts.
    WebFont.load({
      google: {
        families: ['Roboto:100,300,400,500,700,900'],
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
   *
   * @private
   *
   * @return {JSX.Element}
   *   Jsx html element.
   */
  render() {
    // Build page head title.
    const { appTitle, appName } = this.props
    let title = appTitle ? `${appTitle} | ${appName}` : appName

    return (
      <Router history={history}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Switch>
          <PrivateRoute exact path="/" component={AlbumsPage} />
          <PrivateRoute path="/users" component={UsersPage} />
          <PrivateRoute path="/trash" component={TrashPage} />
          <Route exact path="/login" component={LoginPage} />
          <PrivateRoute component={Error404} />
        </Switch>
      </Router>
    )
  }
}

/**
 * Create props for the component from the redux store.
 *
 * @param {IStoreState} state
 *   Global redux state.
 */
const mapStateToProps = (state: IStoreState): { appTitle?: string; appName: string } => {
  return {
    appTitle: state.client.appTitle,
    appName: state.client.appName,
  }
}

export default connect(mapStateToProps, { setClientDimensions, setTranslations })(App)
