
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { IoPersonStalker, IoHome, IoArrowExpand, IoArrowShrink } from 'react-icons/lib/io'
import { MdFace } from 'react-icons/lib/md'
import { GoSignOut } from 'react-icons/lib/go'

import AlbumName from './AlbumName'

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
    const { title, full_screen, selected_album } = this.props
    let headerTitle = <h1>{ title }</h1>
    if (selected_album && selected_album.id > 0) {

      headerTitle = <h1><AlbumName name={ selected_album.name } album_id={ selected_album.id } /></h1>
    }
    return (
      <div className="header" id="app_header">

        <div className="app-name pull-left">
          <Link to="/admin">{ headerTitle }</Link>
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

Header.propTypes = {
  title: PropTypes.string.isRequired,
  full_screen: PropTypes.bool.isRequired,
  selected_album: PropTypes.object
}

// Header.defaultProps = {
//   selected_album: null
// }

function mapStateToProps(state) {
  const { client, admin_header, admin_albums } = state
  return {
    title: admin_header.title,
    full_screen: client.full_screen,
    selected_album: admin_albums.selected_album.album
  }
}

export default connect(mapStateToProps)(Header)
