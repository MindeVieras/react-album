
import React from 'react';

class Header extends React.Component {
  
  render() {
    return (
      <div className="header-component">
        <div id="app-header">
          <div className="app-name">
            <h1><a href="/">Album</a></h1>
          </div>

          <div className="pull-right">
            <ul className="main-menu">
              <li><a href="/faces"><i className="fa fa-smile-o"></i></a></li>
              <li><a href="/user/add"><i className="fa fa-users"></i></a></li>
              <li><a href="/logout"><i className="fa fa-sign-out"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

}

export default Header; 