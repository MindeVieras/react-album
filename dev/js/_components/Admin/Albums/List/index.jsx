
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PerfectScrollbar from 'react-perfect-scrollbar'

import { RingLoader } from 'react-spinners'

import Bar from './Bar'

import { albumsActions, uploaderActions, utilsActions } from '../../../../_actions'

class AlbumsList extends Component {

  componentDidMount(){
    const { albums, dispatch } = this.props
    dispatch(albumsActions.getList())
  }

  onAlbumSelect(id) {
    const { dispatch } = this.props
    dispatch(uploaderActions.clearFiles())
    dispatch(albumsActions.getOne(id))
    dispatch(utilsActions.saveAdminSetting('selected_album', id))
  }

  render() {
    const { selected_album_id, albums } = this.props
    const scrollbarOptions = {
      wheelSpeed: 1.25,
      // useBothWheelAxes: true
    }
    if (albums) {
      return (
        <div className="albums-list">
          <Bar />
          {albums.loading &&
            <RingLoader />
          }
          {albums.err &&
            <div>{albums.err}</div>
          }
          {albums.items &&
            <PerfectScrollbar
              option={ scrollbarOptions }
              className="admin-albums-list-scrollbar"
            >
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
            </PerfectScrollbar>
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
  albums: PropTypes.object.isRequired,
  selected_album_id: PropTypes.number.isRequired
}

export default connect()(AlbumsList)
