
import React, { Component } from 'react'
import { connect } from 'react-redux'

import UsersList from './List'
import UserInfo from './Info'

import { headerActions, footerActions } from '../../../_actions'

class UsersPage extends Component {

  componentDidMount() {
    this.props.dispatch(headerActions.setTitle('Users'))
    this.props.dispatch(footerActions.buttonsClear())
    this.props.dispatch(footerActions.buttonSet('New user', 'newUser', 'success'))
  }

  render() {
    return (
      <div id="users_page">
        <div className="users-wrapper">
          <UsersList />
        </div>
        <UserInfo />
      </div>
    )
  }
}

export default connect()(UsersPage)
