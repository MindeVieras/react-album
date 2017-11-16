import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, headerActions, footerActions } from '../../_actions';

class HomePage extends React.Component {

    componentDidMount() {
        this.props.dispatch(headerActions.titleChange('Dashboard'));
        this.props.dispatch(footerActions.linksClear());
    }

    render() {
        const { user } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                homepage
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };