
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import fscreen from 'fscreen'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import blueGrey from '@material-ui/core/colors/blueGrey'
import Fullscreen from '@material-ui/icons/Fullscreen'
import FullscreenExit from '@material-ui/icons/FullscreenExit'

import Title from './Title'
import MainMenu from './MainMenu'

import { clientActions } from '../../../../_actions'

const styles = {
  root: {
    backgroundColor: blueGrey[800]
  },
  toolbar: {
    justifyContent: `space-between`,
  },
  menus: {
    display: `flex`,
  }
}

class Header extends Component {
  constructor(props) {
    super(props)

    this.goFullscreen = this.goFullscreen.bind(this)
    this.goOutFullscreen = this.goOutFullscreen.bind(this)
  }

  goFullscreen() {
    const { dispatch } = this.props
    dispatch(clientActions.setFullScreen(true))
    fscreen.requestFullscreen(document.body)
  }

  goOutFullscreen() {
    const { dispatch } = this.props
    dispatch(clientActions.setFullScreen(false))
    fscreen.exitFullscreen()
  }

  render() {

    const { t } = this.context
    const { title, full_screen, selected_album } = this.props

    let album_id = null
    let headerTitle = title
    if (selected_album && selected_album.id > 0) {
      album_id = selected_album.id
      headerTitle = selected_album.name
    }

    return (
      <AppBar position="static" style={ styles.root }>
        <Toolbar style={ styles.toolbar }>

          <Title title={ headerTitle } album_id={ album_id } />

          <div style={ styles.menus }>
            {!full_screen &&
              <Tooltip
                id="tooltip_go_fullscreen"
                title={ t(`Go fullscreen mode`) }
                enterDelay={ 500 }
              >
                <IconButton onClick={ this.goFullscreen } color="inherit">
                  <Fullscreen />
                </IconButton>
              </Tooltip>
            }
            {full_screen &&
              <Tooltip
                id="tooltip_exit_fullscreen"
                title={ t(`Exit fullscreen mode`) }
                enterDelay={ 500 }
              >
                <IconButton onClick={ this.goOutFullscreen } color="inherit">
                  <FullscreenExit />
                </IconButton>
              </Tooltip>
            }

            <MainMenu />

          </div>

        </Toolbar>
      </AppBar>
    )
  }
}

Header.contextTypes = {
  t: PropTypes.func
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  title: PropTypes.string,
  full_screen: PropTypes.bool.isRequired,
  selected_album: PropTypes.object
}

Header.defaultProps = {
  title: '',
  selected_album: {}
}

function mapStateToProps(state) {
  const { client, admin_header, admin_albums } = state
  return {
    title: admin_header.title,
    full_screen: client.full_screen,
    selected_album: admin_albums.selected_album.album
  }
}

export default connect(mapStateToProps)(Header)
