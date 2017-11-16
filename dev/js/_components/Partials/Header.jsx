import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends React.Component {

    render() {
        const { header } = this.props;
        return (
            <div className="header" id="app_header">

              <div className="app-name">
                <h1><Link to="/">{header.title}</Link></h1>
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
    const { header } = state;
    return {
        header
    };
}

const connectedHeader = connect(mapStateToProps)(Header);
export { connectedHeader as Header };