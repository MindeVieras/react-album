
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setTranslations } from 'redux-i18n'
import { Switch, Route } from 'react-router-dom'
import ReduxToastr from 'react-redux-toastr'
import Popup from 'react-popup'
import scriptLoader from 'react-async-script-loader'
import keydown from 'react-keydown'

import { withStyles } from '@material-ui/core/styles'

import { adminTranslations } from '../../translations/adminTranslations'

import Header from './Partials/Header'
import Albums from './Albums'
import Users from './Users'
import TrashPage from './Trash'
import Error404 from './Errors/404'

import { userConstants } from 'Constants'
import { Spinner } from 'Common'
import { googleKey } from 'Helpers'
import { adminUiActions, albumsActions, utilsActions } from 'Actions'

// import 'react-datetime/css/react-datetime.css'
// import 'react-select/dist/react-select.css'
import 'cropperjs/dist/cropper.css'
import 'rc-slider/assets/index.css'
import 'react-perfect-scrollbar/dist/css/styles.css'
import '../../../scss/Admin/main.scss'

const styles = theme => ({
  root: {
    backgroundImage: `url(https://s3-eu-west-1.amazonaws.com/app.mindelis.com/images/bg.jpg)`,
    backgroundPosition: `center`,
    backgroundRepeat: `no-repeat`,
    backgroundSize: `cover`,
    backgroundAttachment: `fixed`,
    display: `flex`,
    flexDirection: `column`,
    height: `100vh`,
    overflow: `hidden`
  },
  flex: {
    display: `flex`,
    flex: 1
  }
})

class Admin extends Component {

  constructor(props) {
    super(props)

  }

  componentDidMount() {
    const { dispatch } = this.props

    // Set admin translations
    dispatch(setTranslations(adminTranslations))
    // Get Admin settings
    dispatch(utilsActions.getAdminSettings())
  }

  componentWillReceiveProps(nextProps) {
    const { selected_album, albums_list, lightbox, keydown, dispatch } = nextProps
    const { album, pager } = selected_album

    if (album.id && keydown.event && albums_list.length > 1) {

      const { keyCode } = keydown.event
      const { current_page, per_page } = pager
      const totalAlbums = albums_list.length

      // find album index in list
      const index = albums_list.map((a) => { return a.id }).indexOf(album.id)

      switch(keyCode) {

      // on key up or down nawigate trough albums list
      case 38: // if navigation to up
        if (index > 0) {
          const newIndex = index - 1
          const newId = albums_list[newIndex].id
          dispatch(albumsActions.getOne(newId))
          dispatch(utilsActions.saveAdminSetting('selected_album', newId))
        }
        break
      case 40: // if navigation to down
        const newIndex = index + 1
        if (newIndex < totalAlbums) {
          const newId = albums_list[newIndex].id
          dispatch(albumsActions.getOne(newId))
          dispatch(utilsActions.saveAdminSetting('selected_album', newId))
        }
        break

      // on key left and right navigate madia pager
      case 37: // if navigating to right
        if (current_page > 0) {
          let newPage = current_page - 1
          dispatch(albumsActions.setMediaPagerPage(newPage))
        }
        break
      case 39: // if navigating to right
        const totalPages = Math.ceil(album.media.length / per_page)
        let newPage = current_page + 1
        if (newPage < totalPages) {
          dispatch(albumsActions.setMediaPagerPage(newPage))
        }
        break

      // on space key open lightbox
      case 32: // if space key
        if (lightbox.isOpen)
          dispatch(adminUiActions.lightboxClose())
        else if (!lightbox.isOpen)
          dispatch(adminUiActions.lightboxOpen())
        break

      }

    }
  }

  render() {
    const { classes, match, isScriptLoadSucceed, access_level, settings } = this.props

    if (isScriptLoadSucceed && settings && settings.admin) {
      return (
        <Fragment>
          <div className={ classes.root } >

            <Header />

            <div className={ classes.flex }>
              <Switch>
                <Route exact path={ match.url } component={ Albums } />
                <Route path={ `${match.url}/users` } component={ Users } />
                {access_level === userConstants.USER_ACCESS_ADMIN &&
                  <Route exact path={ `${match.url}/trash` } component={ TrashPage } />
                }
                <Route component={ Error404 } />
              </Switch>
            </div>

          </div>

          <ReduxToastr />

          <Popup escToClose={ true } />
        </Fragment>
      )
    }
    else {
      return <Spinner type="primary" size={ 70 } />
    }
  }
}

Admin.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  keydown: PropTypes.object.isRequired,
  isScriptLoadSucceed: PropTypes.bool.isRequired,
  access_level: PropTypes.number.isRequired,
  selected_album: PropTypes.object.isRequired,
  settings: PropTypes.object,
  albums_list: PropTypes.array,
  lightbox: PropTypes.object
}

Admin.defaultProps = {
  settings: {},
  albums_list: [],
  lightbox: {}
}

function mapStateToProps(state) {
  const { auth, admin_albums, admin_ui, settings } = state

  return {
    access_level: auth.access_level,
    settings,
    selected_album: admin_albums.selected_album,
    albums_list: admin_albums.list.items,
    lightbox: admin_ui.lightbox
  }
}

export default connect(mapStateToProps)(scriptLoader([
  'https://maps.googleapis.com/maps/api/js?key='+googleKey+'&v=3.exp&libraries=places'
])(keydown(withStyles(styles)(Admin))))
