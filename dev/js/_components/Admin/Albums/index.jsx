
import React from 'react'
import { connect } from 'react-redux'
import Rnd from 'react-rnd'

import AlbumsList from './List'
import AlbumInfo from './Info'

import { headerActions, footerActions, utilsActions, albumsActions } from '../../../_actions'

class Albums extends React.Component {

  constructor(props) {
    super(props)
    
    this.state = {
      infoWidth: props.client_width - props.sidebar_width
    }
  }

  componentDidMount() {
    const { selected_album_id, dispatch } = this.props
    dispatch(headerActions.setTitle('Album'))
    dispatch(footerActions.buttonsClear())
    dispatch(footerActions.buttonSet('', 'newAlbum', 'success'))
    dispatch(albumsActions.getList())
    dispatch(albumsActions.getOne(selected_album_id))
  }

  onSidebarResize(e, direction, ref, delta, position) {
    const { dispatch } = this.props
    let width = ref.offsetWidth
    dispatch(utilsActions.setAdminSetting('sidebar_width', width))
  }

  onSidebarResizeEnd(e, direction, ref, delta, position) {
    const { user_id, dispatch } = this.props
    let width = ref.offsetWidth
    dispatch(utilsActions.saveAdminSetting('sidebar_width', width, user_id))
  }

  render() {
    const { client_width, sidebar_width, albums, selected_album, selected_album_id } = this.props
    let info_width = client_width - sidebar_width
    return (
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
            minWidth={ 100 }
            maxWidth={ 300 }
            disableDragging={ true }
            onResize={((e, direction, ref, delta, position) => this.onSidebarResize(e, direction, ref, delta, position))}
            onResizeStop={((e, direction, ref, delta, position) => this.onSidebarResizeEnd(e, direction, ref, delta, position))}
          >
          {selected_album &&
            <AlbumsList albums={ albums } selected_album_id={ selected_album_id } />
          }
          </Rnd>
        </div>
        <div className="info-wrapper">
          <AlbumInfo selected_album={ selected_album } width={ info_width } />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { auth, client, settings, admin_albums } = state
  return {
    user_id: auth.user.id,
    selected_album: admin_albums.selected_album || {},
    selected_album_id: parseInt(settings.admin.selected_album),
    sidebar_width: parseInt(settings.admin.sidebar_width),
    client_width: client.screen.width,
    albums: admin_albums.list
  }
}

export default connect(mapStateToProps)(Albums)
