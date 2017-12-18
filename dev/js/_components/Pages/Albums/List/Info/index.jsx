
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { RingLoader } from 'react-spinners'

import Bar from './Bar'

import { Uploader } from '../../../../Uploader'
import { albumsActions } from '../../../../../_actions'
import { contentConstants, mediaConstants } from '../../../../../_constants'

class AlbumInfo extends Component {

  componentDidMount() {
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
            {selected_album.album.id && selected_album.album.name &&
              <Bar
                album_id={ selected_album.album.id }
                name={ selected_album.album.name }
              />
            }
            
            {selected_album.album.id &&
              <Uploader
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

export default connect(mapStateToProps)(AlbumInfo)
