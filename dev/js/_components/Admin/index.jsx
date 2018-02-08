
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import ReduxToastr from 'react-redux-toastr'
import Popup from 'react-popup'
import scriptLoader from 'react-async-script-loader'

import Header from './Partials/Header'
import Footer from './Partials/Footer'
import Albums from './Albums'
import TrashPage from './Trash'
import Error404 from './Errors/404'

import { utilsActions } from '../../_actions'

import 'react-datetime/css/react-datetime.css'
import '../../../scss/Admin/main.scss'

class Admin extends Component {

  componentDidMount() {
    const { uid, dispatch } = this.props
    // Get Admin settings
    dispatch(utilsActions.getAdminSettings(uid))

  }

  render() {
    const { match, isScriptLoadSucceed } = this.props
    if (isScriptLoadSucceed) {    
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
    else {
      return <div>Scripts are loading...</div>
    }
  }
}

function mapStateToProps(state) {
  const { auth } = state
  return {
    uid: auth.user.id
  }
}

export default connect(mapStateToProps)(scriptLoader([
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyCzi2J0bixOL-SIvephD_qZbuTuuzIaJsc&v=3.exp&libraries=places'
])(Admin))
