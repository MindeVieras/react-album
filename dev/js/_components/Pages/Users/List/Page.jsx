import React from 'react';
import { connect } from 'react-redux';

import { UsersList } from './List';
import { UserInfo } from './Info';

import { headerActions, footerActions } from '../../../../_actions';

class UsersPage extends React.Component {

  componentDidMount() {
    this.props.dispatch(headerActions.setTitle('Users'));
    this.props.dispatch(footerActions.buttonsClear());
    this.props.dispatch(footerActions.buttonSet('Go back', 'goBack', 'info'));
    this.props.dispatch(footerActions.buttonSet('New user', '/user-create', 'success'));
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
      );
  }
}

function mapStateToProps(state) {
  const { dispatch } = state;
  return {
    dispatch
  };
}

const connectedUsersPage = connect(mapStateToProps)(UsersPage);
export { connectedUsersPage as UsersPage };