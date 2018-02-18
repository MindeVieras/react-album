
import React, { Component } from 'react'
import { connect } from 'react-redux'

import UsersList from './List'
import UserInfo from './Info'

import { headerActions, footerActions } from '../../../_actions'

class UsersPage extends Component {

  componentDidMount() {
    this.props.dispatch(headerActions.setTitle('Users'))
    this.props.dispatch(footerActions.buttonsClear())
    this.props.dispatch(footerActions.buttonSet('New user', '/user-create', 'success'))
  }

  render() {
    return (
      <div id="users_page">
        <div className="pull-left users-wrapper">
          <UsersList />
        </div>
        <div className="pull-right info-wrapper">
          <UserInfo />
        </div>
      </div>
    )
  }
}

export default connect()(UsersPage)
