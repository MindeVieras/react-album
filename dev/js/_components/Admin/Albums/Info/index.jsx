
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Spinner from '../../Partials/Spinner'

import Bar from './Bar'
import Foot from './Foot'

import { Uploader } from '../../Uploader'
import { albumsActions, uploaderActions } from '../../../../_actions'
import { contentConstants, mediaConstants } from '../../../../_constants'

class AlbumInfo extends Component {

  componentDidMount() {
    this.props.dispatch(albumsActions.getOne(1))
  }

  componentWillUpdate() {
    this.props.dispatch(uploaderActions.clearFiles())
  }

  render() {
    const { selected_album } = this.props
    return (
      <div className="album-info">
        {selected_album.loading &&
          <Spinner type="primary" size={ 70 } />
        }
        {selected_album.err &&
          <div>{selected_album.err}</div>
        }
        {selected_album.album &&
          <div className="selected-album">
            {selected_album.album.id && selected_album.album.name &&
              <Bar
                album_id={ selected_album.album.id }
                start_date={ selected_album.album.start_date }
                end_date={ selected_album.album.end_date }
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

            {selected_album.album.id &&
              <Foot
                album_id={ selected_album.album.id }
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
  const { admin_albums } = state
  return {
    selected_album: admin_albums.selected_album
  }
}

export default connect(mapStateToProps)(AlbumInfo)
