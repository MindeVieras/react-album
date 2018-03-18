
import React, { Component } from 'react'
import { connect } from 'react-redux'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContextProvider } from 'react-dnd'
import Rnd from 'react-rnd'
import keydown from 'react-keydown'

import AlbumsList from './List'
import AlbumInfo from './Info'

import { headerActions, footerActions, utilsActions, albumsActions } from '../../../_actions'

class Albums extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      infoWidth: props.client_width - props.sidebar_width
    }
  }

  componentDidMount() {
    const { selected_album_id, dispatch } = this.props
    dispatch(headerActions.setTitle(''))
    dispatch(footerActions.buttonsClear())
    dispatch(footerActions.buttonSet('', 'newAlbum', 'success'))
    dispatch(albumsActions.getOne(selected_album_id))
  }

  componentWillReceiveProps(nextProps) {
    const { selected_album, keydown, dispatch } = nextProps
    if (keydown.event) {
      // on key left and right navigate madia pager
      const { keyCode } = keydown.event
      // if navigating to right
      if (keyCode === 37) {
        const { current_page } = selected_album.pager
        if (current_page > 0) {
          let newPage = current_page - 1
          dispatch(albumsActions.setMediaPagerPage(newPage))
        }
      }
      // if navigating to left
      if (keyCode === 39) {
        if (selected_album.album.id) {        
          const { current_page, per_page } = selected_album.pager
          const totalPages = Math.ceil(selected_album.album.media.length / per_page)
          let newPage = current_page + 1
          if (newPage < totalPages) {          
            dispatch(albumsActions.setMediaPagerPage(newPage))
            console.log(newPage, totalPages)
          }
        }
      }
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(albumsActions.clearSelected())
  }

  onSidebarResize(e, direction, ref, delta, position) {
    const { dispatch } = this.props
    let width = ref.offsetWidth
    dispatch(utilsActions.setAdminSetting('sidebar_width', width))
  }

  onSidebarResizeEnd(e, direction, ref, delta, position) {
    const { dispatch } = this.props
    let width = ref.offsetWidth
    dispatch(utilsActions.saveAdminSetting('sidebar_width', width))
  }

  render() {
    const { client_width, client_height, sidebar_width, selected_album } = this.props
    let info_width = client_width - sidebar_width
    let info_height = client_height - 90 // substract header and footer
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div id="albums_page">
          <div className="albums-sidebar" style={{width: `${sidebar_width}px`}}>
            <Rnd
              default={{
                width: sidebar_width,
                height: `100%`
              }}
              enableResizing={{
                top:false,
                right:true,
                bottom:false,
                left:false,
                topRight:false,
                bottomRight:false,
                bottomLeft:false,
                topLeft:false
              }}
              minWidth={ 150 }
              maxWidth={ 350 }
              disableDragging={ true }
              onResize={((e, direction, ref, delta, position) => this.onSidebarResize(e, direction, ref, delta, position))}
              onResizeStop={((e, direction, ref, delta, position) => this.onSidebarResizeEnd(e, direction, ref, delta, position))}
            >
              <AlbumsList width={ sidebar_width } />
            </Rnd>
          </div>
          
          {selected_album &&
            <AlbumInfo
              selected_album={ selected_album }
              width={ info_width }
              height={ info_height }
            />
          }

        </div>
      </DragDropContextProvider>
    )
  }
}

function mapStateToProps(state) {
  const { client, settings, admin_albums } = state
  return {
    selected_album: admin_albums.selected_album,
    selected_album_id: parseInt(settings.admin.selected_album),
    sidebar_width: parseInt(settings.admin.sidebar_width),
    client_width: client.screen.width,
    client_height: client.screen.height
  }
}

export default connect(mapStateToProps)(keydown(Albums))
