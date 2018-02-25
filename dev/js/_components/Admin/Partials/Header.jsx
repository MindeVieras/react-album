
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
    const { title, full_screen, client_width, selected_album } = this.props
    let titleStyle = {
      width: client_width - 240
    }
    let album_id = null
    let headerTitle = title
    if (selected_album && selected_album.id > 0) {
      album_id = selected_album.id
      headerTitle = selected_album.name
    }
    return (
      <div className="header" id="app_header">

        <div className="app-name pull-left">
          <h1 style={ titleStyle }>
            <Link to="/admin">
              <AlbumName name={ headerTitle } album_id={ album_id } />
            </Link>
          </h1>
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
  client_width: PropTypes.number.isRequired,
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
    client_width: client.screen.width,
    selected_album: admin_albums.selected_album.album
  }
}

export default connect(mapStateToProps)(Header)
