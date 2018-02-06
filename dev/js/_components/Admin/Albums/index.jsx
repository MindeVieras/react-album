
import React from 'react'
import { connect } from 'react-redux'

import AlbumsList from './List'
import AlbumInfo from './Info'

import { headerActions, footerActions } from '../../../_actions'

class Albums extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(headerActions.setTitle('Album'))
    dispatch(footerActions.buttonsClear())
    dispatch(footerActions.buttonSet('', 'newAlbum', 'success'))
  }

  render() {
    const { selected_album_id } = this.props
    return (
      <div id="albums_page">
        <div className="albums-wrapper">
          <AlbumsList selected_album_id={ selected_album_id } />
        </div>
        <div className="info-wrapper">
          <AlbumInfo selected_album_id={ selected_album_id } />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { auth } = state
  return {
    selected_album_id: parseInt(auth.user.settings.admin_selected_album)
  }
}

export default connect(mapStateToProps)(Albums)
