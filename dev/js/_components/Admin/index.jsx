
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import ReduxToastr from 'react-redux-toastr'
import Popup from 'react-popup'

import Header from './Partials/Header'
import Footer from './Partials/Footer'
import Albums from './Albums'
import TrashPage from './Trash'
import Error404 from './Errors/404'
// import {
//   UsersPage,
//   UserCreatePage} from '../_components'

// import { headerActions } from '../../_actions'

import 'react-datetime/css/react-datetime.css'
import '../../../scss/Admin/main.scss'

class Admin extends Component {

  render() {
    const { match } = this.props
    return (
      <div id="admin_wrapper">
        
        <Header />
        
        <div id="admin_content">
          <Switch>
            <Route exact path={ match.url } component={Albums} />
            {/*<PrivateRoute path="/users" component={UsersPage} />*/}
            {/*<PrivateRoute path="/user-create" component={UserCreatePage} />*/}
            <Route exact path={`${match.url}/trash`} component={TrashPage} />
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
