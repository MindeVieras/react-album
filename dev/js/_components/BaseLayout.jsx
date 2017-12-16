
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import ReduxToastr from 'react-redux-toastr'
import WebFont from 'webfontloader'
import { history } from '../_helpers'

import Header from '../_components/Partials/Header'
import Footer from '../_components/Partials/Footer'
import {
  PrivateRoute,
  AlbumsPage,
  AlbumCreatePage,
  UsersPage,
  UserCreatePage} from '../_components'

import { uploaderActions } from '../_actions'

class BaseLayout extends Component {
  constructor(props) {
    super(props)

    const { dispatch } = this.props
    history.listen((location, action) => {
      // clear alert and uoloader on location change
      dispatch(uploaderActions.clear())
      dispatch(alertActions.clear())
    })
  }

  componentDidMount() {
    WebFont.load({
      google: {
        families: [
          // 'Roboto:100,300,400,500,700,900',
          'Dosis:300,400,500,600,700,800',
          // 'Oxygen:300,400,700',
          // 'Ruda:400,700,900',
          'sans-serif'
        ]
      }
    })
  }

  render() {
    const { header } = this.props
    // console.log(this.props);
    return (
      <div id="app_wrapper">
        
        <Header title={header.title} />
        
        <div id="app_content">
          <Switch>
            <PrivateRoute exact path="/" component={AlbumsPage} />
            <PrivateRoute exact path="/album-create" component={AlbumCreatePage} />
            <PrivateRoute path="/users" component={UsersPage} />
            <PrivateRoute path="/user-create" component={UserCreatePage} />
            <PrivateRoute component={NoMatch} />
          </Switch>
        </div>

        <ReduxToastr
          timeOut={2000}
        />

        <Footer />
      </div>
    )
  }
}

const NoMatch = ({ location }) => (
  <div>
    <h3>404 No match for <code>{location.pathname}</code></h3>
  </div>
)


function mapStateToProps(state) {
  const { header } = state
  // console.log(state);
  return { header }
}

export default connect(mapStateToProps)(BaseLayout)
