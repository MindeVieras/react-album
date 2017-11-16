import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute, LoginPage, BaseLayout } from '../_components';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        // Load sass files
        history.location.pathname == '/login' ? require('../../scss/login/login.scss') : require('../../scss/app/main.scss');
        
        const { alert } = this.props;
        return (
            <div>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/login" component={LoginPage} />
                        <PrivateRoute component={BaseLayout} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 