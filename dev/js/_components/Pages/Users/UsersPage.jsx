import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { UsersList } from './List';
import { UserInfo } from './Info';

import { userActions, headerActions, footerActions } from '../../../_actions';

class UsersPage extends React.Component {

  componentDidMount() {
    this.props.dispatch(headerActions.titleChange('Users'));
    this.props.dispatch(footerActions.linksClear());
    this.props.dispatch(footerActions.linkAdd('New user', '/user-create', 'create_user_footer_link'));
    this.props.dispatch(userActions.getList());
    this.props.dispatch(userActions.getOne(this.props.auth.user.id));
  }

  render() {
      const { auth, users, userGetOne } = this.props;
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

UsersPage.propTypes = {
  auth: PropTypes.object,
  users: PropTypes.object,
  userGetOne: PropTypes.object
}

function mapStateToProps(state) {
  const { authentication, userGetOne, users } = state;
  return {
    auth: authentication,
    userGetOne,
    users
  };
  return state;
}

const connectedUsersPage = connect(mapStateToProps)(UsersPage);
export { connectedUsersPage as UsersPage };