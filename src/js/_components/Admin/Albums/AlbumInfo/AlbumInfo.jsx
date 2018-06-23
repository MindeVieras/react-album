
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PerfectScrollbar from 'react-perfect-scrollbar'

import Spinner from '../../Partials/Spinner'
import DeleteAlbum from '../../Buttons/DeleteAlbum'
import Bar from './Bar'
import Media from './Media'

import { headerActions, footerActions } from '../../../../_actions'
import { albumsConstants, contentConstants, mediaConstants } from '../../../../_constants'

class AlbumInfo extends Component {

  componentWillReceiveProps(nextProps) {
    const { selected_album, dispatch } = nextProps
    if (selected_album.album) {
      const { id, name, media, status } = selected_album.album
      dispatch(headerActions.setTitle(name))
      // dispatch(footerActions.buttonRemove('deleteAlbum'))
      // dispatch(footerActions.buttonRemove('openLightbox'))
      // if (albumsConstants.ENABLED === status) {
      //   dispatch(footerActions.buttonSet('', 'deleteAlbum', 'danger', {album_id: id, name}))
      //   if (media.length > 0) {
      //     dispatch(footerActions.buttonSet('', 'openLightbox', 'success', {album_id: id}))
      //   }
      // }
    }
  }

  render() {
    const { width, height, selected_album } = this.props

    let wrapper_height = height - 38 // suctract infoBar height

    return (
      <div className="album-info" style={{ width: `${width}px` }}>
        {selected_album.album.loading &&
          <Spinner type="primary" size={ 70 } />
        }
        {selected_album.album.err &&
          <div>{selected_album.album.err}</div>
        }
        {selected_album.album.id &&
          <div className="selected-album">
            <Bar
              album_id={ selected_album.album.id }
              start_date={ selected_album.album.start_date }
              end_date={ selected_album.album.end_date }
            />

            <Media
              entity={contentConstants.TYPE_ALBUM}
              entity_id={selected_album.album.id}
              status={mediaConstants.STATUS_ENABLED}
              files={ selected_album.album.media }
              wrapper_width={ width }
              wrapper_height={ wrapper_height }
            />

            <DeleteAlbum
              id={ selected_album.album.id }
              name={ selected_album.album.name }
            />

          </div>
        }

      </div>
    )
  }
}

AlbumInfo.propTypes = {
  selected_album: PropTypes.object.isRequired,
  width: PropTypes.number,
  height: PropTypes.number
}

AlbumInfo.defaultProps = {
  width: 500,
  heght: 600
}

export default connect()(AlbumInfo)
