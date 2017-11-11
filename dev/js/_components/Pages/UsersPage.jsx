import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { UsersCreatePage } from '../../_components';
import { userActions } from '../../_actions';

class UsersPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    render() {
        console.log(this.props);
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
    const { users } = state;
    const { creating } = state.userCreation;
    return {
        creating,
        users
    };
}

const connectedUserCreatePage = connect(mapStateToProps)(UsersPage);
export { connectedUserCreatePage as UsersPage };