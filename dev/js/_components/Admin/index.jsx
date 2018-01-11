
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import ReduxToastr from 'react-redux-toastr'
import Popup from 'react-popup'
// import { history } from '../../_helpers'

import Header from './Partials/Header'
import Footer from './Partials/Footer'
import Albums from './Albums'
import TrashPage from './Trash'
import Error404 from './Errors/404'
// import {
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
