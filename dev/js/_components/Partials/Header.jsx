import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { IoPersonStalker } from 'react-icons/lib/io';
import { MdFace } from 'react-icons/lib/md';
import { GoSignOut } from 'react-icons/lib/go';

const Header = ({ title }) => {
    return (
      <div className="header" id="app_header">

        <div className="app-name pull-left">
          <h1><Link to="/">{title}</Link></h1>
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

Header.propTypes = {
  title: PropTypes.string.isRequired
}

export default Header;
