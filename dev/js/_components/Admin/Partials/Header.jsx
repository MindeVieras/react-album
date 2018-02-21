
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { IoPersonStalker, IoHome, IoArrowExpand, IoArrowShrink } from 'react-icons/lib/io'
import { MdFace } from 'react-icons/lib/md'
import { GoSignOut } from 'react-icons/lib/go'

import { clientActions } from '../../../_actions'

class Header extends Component {
  constructor(props) {
    super(props)

    this.goFullscreen = this.goFullscreen.bind(this)
    this.goOutFullscreen = this.goOutFullscreen.bind(this)
  }

  goFullscreen() {
    const { dispatch } = this.props
    dispatch(clientActions.setFullScreen(true))
  }
  goOutFullscreen() {
    const { dispatch } = this.props
    dispatch(clientActions.setFullScreen(false))
  }

  render() {
    const { title, full_screen } = this.props
    // let fsButton = 
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
            {!full_screen &&
              <li onClick={ this.goFullscreen }><IoArrowExpand /></li>
            }
            {full_screen &&
              <li onClick={ this.goOutFullscreen }><IoArrowShrink /></li>
            }
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { client, admin_header } = state
  return {
    title: admin_header.title,
    full_screen: client.full_screen
  }
}

export default connect(mapStateToProps)(Header)
