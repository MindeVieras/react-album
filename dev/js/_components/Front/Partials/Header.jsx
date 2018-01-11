
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { IoPersonStalker, IoHome } from 'react-icons/lib/io'
import { MdFace } from 'react-icons/lib/md'
import { GoSignOut } from 'react-icons/lib/go'

const Header = ({ title }) => {
  return (
    <div className="header" id="app_header">

      <div className="app-name pull-left">
        <h1><Link to="/admin">{title}</Link></h1>
      </div>

      <div className="pull-right">
        <ul className="main-menu">
          <li><Link to="/admin/faces"><MdFace /></Link></li>
          <li><Link to="/admin/users"><IoPersonStalker /></Link></li>
          <li><Link to="/"><IoHome /></Link></li>
          <li><Link to="/login"><GoSignOut /></Link></li>
        </ul>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  const { admin_header } = state
  return {
    title: admin_header.title
  }
}

export default connect(mapStateToProps)(Header)
