
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setTranslations } from 'redux-i18n'
import { Switch, Route } from 'react-router-dom'
import ReduxToastr from 'react-redux-toastr'
import Popup from 'react-popup'
import scriptLoader from 'react-async-script-loader'
import Fullscreen from 'react-full-screen'
import keydown from 'react-keydown'

import { adminTranslations } from '../../translations/adminTranslations'

import Header from './Partials/Header'
import Footer from './Partials/Footer'
import Albums from './Albums'
import UsersPage from './Users'
import TrashPage from './Trash'
import Error404 from './Errors/404'

import { googleKey } from '../../_helpers/config'
import { albumsActions, utilsActions, clientActions } from '../../_actions'

import 'react-datetime/css/react-datetime.css'
import 'react-toggle/style.css'
import 'react-select/dist/react-select.css'
import 'rc-slider/assets/index.css'
import 'hamburgers/dist/hamburgers.css'
import 'react-dd-menu/dist/react-dd-menu.css'
import '../../../scss/Admin/main.scss'

class Admin extends Component {

  constructor(props) {
    super(props)

    this.onFullScreenChange = this.onFullScreenChange.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props

    dispatch(setTranslations(adminTranslations))
    // Get Admin settings
    dispatch(utilsActions.getAdminSettings())
  }

  componentWillReceiveProps(nextProps) {
    const { selected_album, albums_list, keydown, dispatch } = nextProps
    const { album, pager } = selected_album

    if (album.id) {

      if (keydown.event) {
        const { keyCode } = keydown.event

        // on key left and right navigate madia pager

        // if navigating to right
        if (keyCode === 37) {
          const { current_page } = pager
          if (current_page > 0) {
            let newPage = current_page - 1
            dispatch(albumsActions.setMediaPagerPage(newPage))
          }
        }
        // if navigating to left
        if (keyCode === 39) {
          const { current_page, per_page } = pager
          const totalPages = Math.ceil(album.media.length / per_page)
          let newPage = current_page + 1
          if (newPage < totalPages) {
            dispatch(albumsActions.setMediaPagerPage(newPage))
          }
        }

        // on key up or down nawigate trough albums list
        if (keyCode === 38 || keyCode === 40) {
          if (albums_list.length > 1) {
            const totalAlbums = albums_list.length

            // find album index in list
            const index = albums_list.map(function(a) { return a.id }).indexOf(album.id)

            // if navigation to up
            if (keyCode === 38 && index > 0) {
              const newIndex = index - 1
              const newId = albums_list[newIndex].id
              dispatch(albumsActions.getOne(newId))
              dispatch(utilsActions.saveAdminSetting('selected_album', newId))
            }

            // if navigation to down
            if (keyCode === 40) {
              const newIndex = index + 1
              if (newIndex < totalAlbums) {
                const newId = albums_list[newIndex].id
                dispatch(albumsActions.getOne(newId))
                dispatch(utilsActions.saveAdminSetting('selected_album', newId))
              }
            }

          }
        }
      }
    }
  }

  onFullScreenChange(isFull) {
    const { dispatch } = this.props
    // Get Admin settings
    dispatch(clientActions.setFullScreen(isFull))
  }

  render() {
    const { match, isScriptLoadSucceed, settings, full_screen } = this.props
    if (isScriptLoadSucceed && settings) {
      return (
        <div>
          <Fullscreen
            enabled={ full_screen }
            onChange={ this.onFullScreenChange }
          >
            <div id="admin_wrapper">

              <Header />

              <div id="admin_content">
                <Switch>
                  <Route exact path={ match.url } component={Albums} />
                  <Route path={`${match.url}/users`} component={UsersPage} />
                  <Route exact path={`${match.url}/trash`} component={TrashPage} />
                  <Route component={Error404} />
                </Switch>
              </div>

              <Footer />

              <ReduxToastr
                timeOut={2000}
              />

              <Popup
                escToClose={ true }
              />

            </div>

          </Fullscreen>
        </div>
      )
    }
    else {
      return <div>APP loading...</div>
    }
  }
}

function mapStateToProps(state) {
  const { admin_albums, settings, client } = state
  return {
    settings: settings.admin,
    full_screen: client.full_screen,
    selected_album: admin_albums.selected_album,
    albums_list: admin_albums.list.items
  }
}

export default connect(mapStateToProps)(scriptLoader([
  'https://maps.googleapis.com/maps/api/js?key='+googleKey+'&v=3.exp&libraries=places'
])(keydown(Admin)))
