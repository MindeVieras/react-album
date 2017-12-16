
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { RingLoader } from 'react-spinners'

import { Uploader } from '../../../Uploader'
import { albumsActions } from '../../../../_actions'
import { contentConstants, mediaConstants } from '../../../../_constants'

class AlbumInfo extends Component {

  componentDidMount() {
    this.props.dispatch(albumsActions.getOne(53))
  }

  onAlbumDelete(id) {
    this.props.dispatch(albumsActions.delete(id))
    this.props.dispatch(albumsActions.getOne(53))
  }

  render() {
    const { selected_album } = this.props

    return (
      <div className="album-info">
        {selected_album.loading &&
          <RingLoader />
        }
        {selected_album.err &&
          <div>{selected_album.err}</div>
        }
        {selected_album.album &&
          <div className="selected-album">
            <div className="album-bar">
              <div className="name">
                {selected_album.album.name}
              </div>
              <div className="buttons">
                <div className="btn btn-xs btn-info">Edit</div>
                <div
                  className="btn btn-xs btn-danger"
                  onClick={() => this.onAlbumDelete(selected_album.album.id)}
                >Delete</div>
              </div>
            </div>
            
            {selected_album.album.id && selected_album.album.author &&
              <Uploader
                author={selected_album.album.author}
                entity={contentConstants.TYPE_ALBUM}
                entity_id={selected_album.album.id}
                status={mediaConstants.STATUS_ENABLED}
              />
            }

          </div>
        }
      </div>
    )
  }
}

AlbumInfo.propTypes = {
  selected_album: PropTypes.object.isRequired,
  dispatch: PropTypes.func
}

function mapStateToProps(state) {
  const { albums } = state
  return {
    selected_album: albums.selected_album
  }
}

const connectedAlbumInfo = connect(mapStateToProps)(AlbumInfo)
export { connectedAlbumInfo as AlbumInfo }
