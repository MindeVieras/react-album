
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import fscreen from 'fscreen'

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'

import Fullscreen from '@material-ui/icons/Fullscreen'
import FullscreenExit from '@material-ui/icons/FullscreenExit'

import { Tip } from 'Common'
import Title from './Title'
import MainMenu from './MainMenu'

import { clientActions } from 'Actions'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.header
  },
  toolbar: {
    justifyContent: `space-between`,
  },
  menus: {
    display: `flex`,
  }
})

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
    const { classes, user, title, full_screen, selected_album } = this.props

    let album_id = null
    let headerTitle = title
    if (selected_album && selected_album.id > 0) {
      album_id = selected_album.id
      headerTitle = selected_album.name
    }

    return (
      <AppBar position="static" className={ classes.root }>
        <Toolbar className={ classes.toolbar }>

          <Title title={ headerTitle } album_id={ album_id } />

          <div className={ classes.menus }>
            {!full_screen &&
              <Fragment>
                <IconButton
                  data-tip
                  data-for="tip_go_fullscreen"
                  onClick={ this.goFullscreen }
                  color="inherit"
                >
                  <Fullscreen />
                </IconButton>
                <Tip id="tip_go_fullscreen" effect="solid">{ t(`Go fullscreen mode`) }</Tip>
              </Fragment>
            }
            {full_screen &&
              <Fragment>
                <IconButton
                  data-tip
                  data-for="tip_exit_fullscreen"
                  onClick={ this.goOutFullscreen }
                  color="inherit"
                >
                  <FullscreenExit />
                </IconButton>
                <Tip id="tip_exit_fullscreen">{ t(`Exit fullscreen mode`) }</Tip>
              </Fragment>
            }

            <MainMenu user={ user } />

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
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  full_screen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  selected_album: PropTypes.object
}

Header.defaultProps = {
  title: '',
  selected_album: {}
}

function mapStateToProps(state) {
  const { auth, client, admin_header, admin_albums } = state
  return {
    user: auth.user,
    title: admin_header.title,
    full_screen: client.full_screen,
    selected_album: admin_albums.selected_album.album
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Header))
