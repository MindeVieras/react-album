import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { UsersCreatePage } from '../../_components';
import { userActions, headerActions, footerActions } from '../../_actions';

class UsersPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(headerActions.titleChange('Users'));
        this.props.dispatch(footerActions.linksClear());
        this.props.dispatch(footerActions.linkAdd('New user', '/user-create', 'create_user_footer_link'));
    }

    render() {
        return (
            <div className="">
                <h2>Users list</h2>
                <Switch>
                    <Route path="/users/create" component={UsersCreatePage} />
                </Switch>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

const connectedUserCreatePage = connect(mapStateToProps)(UsersPage);
export { connectedUserCreatePage as UsersPage };