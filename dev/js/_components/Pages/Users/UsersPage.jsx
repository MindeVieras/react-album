import React from 'react';
import { connect } from 'react-redux';

import { UsersList } from './List';
import { UserInfo } from './Info';

import { userActions, headerActions, footerActions } from '../../../_actions';

class UsersPage extends React.Component {

  componentDidMount() {
    this.props.dispatch(headerActions.titleChange('Users'));
    this.props.dispatch(footerActions.linksClear());
    this.props.dispatch(footerActions.linkAdd('New user', '/user-create', 'create_user_footer_link'));
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
  const { authentication } = state;
  return {
    auth: authentication
  };
  return state;
}

const connectedUsersPage = connect(mapStateToProps)(UsersPage);
export { connectedUsersPage as UsersPage };