import React from 'react';
import { connect } from 'react-redux';

import { UserCreateForm } from './Form';

import { headerActions, footerActions } from '../../../../_actions';

class UserCreatePage extends React.Component {

  componentDidMount() {
    this.props.dispatch(headerActions.setTitle('Create user'));
    this.props.dispatch(footerActions.buttonsClear());
    this.props.dispatch(footerActions.buttonSet('Go back', 'goBack', 'info'));
    this.props.dispatch(footerActions.buttonSet('Save', 'userCreate', 'success'));
  }

  render() {
    return (
      <div id="user_create_page">
        <UserCreateForm userid={this.props.auth.user.id} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { authentication } = state;
  return {
    auth: authentication
  };
}

const connectedUserCreatePage = connect(mapStateToProps)(UserCreatePage);
export { connectedUserCreatePage as UserCreatePage };