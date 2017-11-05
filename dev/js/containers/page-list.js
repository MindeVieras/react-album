import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectPage} from '../actions/index'


class PageList extends Component {

    renderList() {
        return this.props.pages.map((page) => {
            return (
                <li
                    key={page.id}
                    onClick={() => this.props.selectPage(page)}
                >
                    {page.title}
                </li>
            );
        });
    }

    render() {
        return (
            <ul>
                {this.renderList()}
            </ul>
        );
    }

}

// Get apps state and pass it as props to PageList
function mapStateToProps(state) {
    return {
        pages: state.page
    };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    return bindActionCreators({selectPage: selectPage}, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(PageList);
