import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// import { Header, HomePage, UsersPage } from '../_components';

// require('../../scss/app/main.scss');

class Header extends React.Component {

    render() {
        // const { user, users } = this.props;
        return (
            <div className="header" id="app_header">

              <div className="app-name">
                <h1><Link to="/">title</Link></h1>
              </div>

              <div className="pull-right">
                <ul className="main-menu">
                  {/*<li><a href="/faces"><i className="fa fa-smile-o"></i></a></li>*/}
                  <li><Link to="/users"><i className="fa fa-users"></i></Link></li>
                  <li><Link to="/login"><i className="fa fa-sign-out"></i></Link></li>
                </ul>
              </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

const connectedHeader = connect(mapStateToProps)(Header);
export { connectedHeader as Header };