
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import ReduxToastr from 'react-redux-toastr'
import Popup from 'react-popup'
import WebFont from 'webfontloader'
// import { history } from '../../_helpers'

import Header from './Partials/Header'
import Footer from './Partials/Footer'
import Albums from './Albums'
import TrashPage from './Trash'
import Error404 from './Errors/404'
// import {
//   PrivateRoute,
//   AlbumsPage,
//   UsersPage,
//   UserCreatePage} from '../_components'

import { headerActions } from '../../_actions'

import '../../../scss/Admin/main.scss'

class Admin extends Component {
  constructor(props) {
    super(props)

    // const { dispatch } = this.props
    // history.listen((location, action) => {
    //   // clear uoloader on location change
    //   // dispatch(uploaderActions.clear())
    // })
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
    this.props.dispatch(headerActions.setTitle('Admin'))
  }

  render() {
    const { match } = this.props
    return (
      <div id="app_wrapper">
        
        <Header />
        
        <div id="app_content">
          <Switch>
            <Route exact path="/admin" component={Albums} />
            {/*<PrivateRoute path="/users" component={UsersPage} />*/}
            {/*<PrivateRoute path="/user-create" component={UserCreatePage} />*/}
            <Route path={`${match.url}/trash`} component={TrashPage} />
            <Route component={Error404} />
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

export default connect()(Admin)
