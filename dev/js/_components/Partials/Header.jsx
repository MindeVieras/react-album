import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { IoPersonStalker } from 'react-icons/lib/io';
import { MdFace } from 'react-icons/lib/md';
import { GoSignOut } from 'react-icons/lib/go';

class Header extends React.Component {

  render() {
    const { header } = this.props;
    // console.log(this.props);
    return (
      <div className="header" id="app_header">

        <div className="app-name pull-left">
          <h1><Link to="/">{header.title}</Link></h1>
        </div>

        <div className="pull-right">
          <ul className="main-menu">
            <li><a href="/faces"><MdFace /></a></li>
            <li><Link to="/users"><IoPersonStalker /></Link></li>
            <li><Link to="/login"><GoSignOut /></Link></li>
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