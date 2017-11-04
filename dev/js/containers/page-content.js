import React, {Component} from 'react';
import {connect} from 'react-redux';

/*
 * We need "if(!this.props.user)" because we set state to null by default
 * */

class PageContent extends Component {
    render() {
        if (!this.props.page) {
            return (<div>do something</div>);
        }
        return (
            <div>
                <h2>{this.props.page.title}</h2>
                <h3>{this.props.page.body}</h3>
            </div>
        );
    }
}

// "state.activePage" is set in reducers/index.js
function mapStateToProps(state) {
    return {
        page: state.activePage
    };
}

export default connect(mapStateToProps)(PageContent);
