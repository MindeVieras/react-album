
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="header" id="front_header">

      <div className="app-name pull-left">
        <h1><Link to="/"></Link></h1>
      </div>

      <div className="pull-right">
        <ul className="main-menu">
          <li><Link to="/admin">Admin</Link></li>
          <li><Link to="/login">Logout</Link></li>
        </ul>
      </div>
    </header>
  )
}

export default Header
