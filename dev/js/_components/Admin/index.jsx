
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import ReduxToastr from 'react-redux-toastr'
import Popup from 'react-popup'
import scriptLoader from 'react-async-script-loader'
import Fullscreen from 'react-full-screen'

import Header from './Partials/Header'
import Footer from './Partials/Footer'
import Albums from './Albums'
import UsersPage from './Users'
import TrashPage from './Trash'
import Error404 from './Errors/404'

import { googleKey } from '../../_helpers/config'
import { utilsActions, clientActions } from '../../_actions'

import 'react-datetime/css/react-datetime.css'
import 'react-select/dist/react-select.css'
import 'rc-slider/assets/index.css'
import '../../../scss/Admin/main.scss'

class Admin extends Component {

  constructor(props) {
    super(props)
 
    this.onFullScreenChange = this.onFullScreenChange.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    // Get Admin settings
    dispatch(utilsActions.getAdminSettings())
  }

  onFullScreenChange(isFull) {
    const { dispatch } = this.props
    // Get Admin settings
    dispatch(clientActions.setFullScreen(isFull))
  }

  render() {
    const { match, isScriptLoadSucceed, settings, full_screen } = this.props
    if (isScriptLoadSucceed && settings) {    
      return (
        <div>
          <Fullscreen
            enabled={ full_screen }
            onChange={ this.onFullScreenChange }
          >
            <div id="admin_wrapper">
              
              <Header />

              <div id="admin_content">
                <Switch>
                  <Route exact path={ match.url } component={Albums} />
                  <Route exact path={`${match.url}/users`} component={UsersPage} />
                  {/*<PrivateRoute path="/user-create" component={UserCreatePage} />*/}
                  <Route exact path={`${match.url}/trash`} component={TrashPage} />
                  <Route component={Error404} />
                </Switch>
              </div>

              <Footer />

              <ReduxToastr
                timeOut={2000}
              />

              <Popup
                wildClasses={ true }
              />

            </div>

          </Fullscreen>
        </div>
      )
    }
    else {
      return <div>APP loading...</div>
    }
  }
}

function mapStateToProps(state) {
  const { settings, client } = state
  return {
    settings: settings.admin,
    full_screen: client.full_screen
  }
}

export default connect(mapStateToProps)(scriptLoader([
  'https://maps.googleapis.com/maps/api/js?key='+googleKey+'&v=3.exp&libraries=places'
])(Admin))
