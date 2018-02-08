
import React from 'react'
import { connect } from 'react-redux'
import Rnd from 'react-rnd'

import AlbumsList from './List'
import AlbumInfo from './Info'

import { headerActions, footerActions, utilsActions } from '../../../_actions'

class Albums extends React.Component {

  constructor(props) {
    super(props)
    
    this.state = {
      infoWidth: props.client_width - props.sidebar_width
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(headerActions.setTitle('Album'))
    dispatch(footerActions.buttonsClear())
    dispatch(footerActions.buttonSet('', 'newAlbum', 'success'))
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
    const { client_width, sidebar_width, selected_album_id } = this.props
    let info_width = client_width - sidebar_width
    return (
      <div id="albums_page">
        <div>
          <Rnd
            default={{
              width: sidebar_width
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
            className="albums-sidebar"
            onResize={((e, direction, ref, delta, position) => this.onSidebarResize(e, direction, ref, delta, position))}
            onResizeStop={((e, direction, ref, delta, position) => this.onSidebarResizeEnd(e, direction, ref, delta, position))}
          >
            <AlbumsList selected_album_id={ selected_album_id } />
          </Rnd>
        </div>
        <div className="info-wrapper">
          <AlbumInfo width={ info_width } selected_album_id={ selected_album_id } />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { auth, client, settings } = state
  return {
    user_id: auth.user.id,
    selected_album_id: parseInt(settings.admin.selected_album),
    sidebar_width: parseInt(settings.admin.sidebar_width),
    client_width: client.screen.width
  }
}

export default connect(mapStateToProps)(Albums)
