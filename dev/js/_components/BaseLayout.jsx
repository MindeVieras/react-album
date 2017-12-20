
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import ReduxToastr from 'react-redux-toastr'
import Popup from 'react-popup'
import WebFont from 'webfontloader'
import { history } from '../_helpers'

import TrashPage from '../_components/Pages/Trash'
import Error404 from '../_components/Pages/Errors/404'
import Header from '../_components/Partials/Header'
import Footer from '../_components/Partials/Footer'
import {
  PrivateRoute,
  AlbumsPage,
  UsersPage,
  UserCreatePage} from '../_components'

class BaseLayout extends Component {
  constructor(props) {
    super(props)

    // const { dispatch } = this.props
    history.listen((location, action) => {
      // clear uoloader on location change
      // dispatch(uploaderActions.clear())
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
            <PrivateRoute path="/users" component={UsersPage} />
            <PrivateRoute path="/user-create" component={UserCreatePage} />
            <PrivateRoute path="/trash" component={TrashPage} />
            <PrivateRoute component={Error404} />
          </Switch>
        </div>

        <Footer />

        <ReduxToastr
          timeOut={2000}
        />

        <Popup />

      </div>
    )
  }
}

function mapStateToProps(state) {
  const { header } = state
  // console.log(state);
  return { header }
}

export default connect(mapStateToProps)(BaseLayout)
