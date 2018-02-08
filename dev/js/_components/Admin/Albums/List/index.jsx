
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { RingLoader } from 'react-spinners'

import { albumsActions, uploaderActions, utilsActions } from '../../../../_actions'

class AlbumsList extends Component {

  componentDidMount(){
    const { albums, dispatch } = this.props
    dispatch(albumsActions.getList())
  }

  onAlbumSelect(id) {
    const { user_id, dispatch } = this.props
    dispatch(uploaderActions.clearFiles())
    dispatch(albumsActions.getOne(id))
    dispatch(utilsActions.saveAdminSetting('selected_album', id, user_id))
  }

  render() {
    const { selected_album_id, albums } = this.props
    if (albums) {
      return (
        <div className="albums-list">
          {albums.loading &&
            <RingLoader />
          }
          {albums.err &&
            <div>{albums.err}</div>
          }

          {albums.items && 
            <ul>
              {albums.items.map((album) =>
                <li
                  key={album.id}
                  className={`albums-item${ selected_album_id === album.id ? ' active' : ''}`}
                  onClick={() => this.onAlbumSelect(album.id)}
                >
                  <div className="name">{album.name}</div>
                </li>
              )}
            </ul>
          }
        </div>
      )
    }
    else {
      return <span>Nothing to display</span>
    }
  }
}

AlbumsList.propTypes = {
  user_id: PropTypes.number.isRequired,
  albums: PropTypes.object.isRequired,
  selected_album_id: PropTypes.number.isRequired
}

function mapStateToProps(state) {
  const { auth, admin_albums } = state
  return {
    user_id: auth.user.id,
    albums: admin_albums.list
  }
}

export default connect(mapStateToProps)(AlbumsList)
