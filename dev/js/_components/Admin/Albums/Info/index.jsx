
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PerfectScrollbar from 'react-perfect-scrollbar'

import Spinner from '../../Partials/Spinner'
import Bar from './Bar'
import { Uploader } from '../../Uploader'

import { headerActions, footerActions, uploaderActions } from '../../../../_actions'
import { contentConstants, mediaConstants } from '../../../../_constants'

class AlbumInfo extends Component {

  componentDidMount() {
    const { selected_album, dispatch } = this.props
    dispatch(uploaderActions.clearFiles())
  }

  componentWillReceiveProps(nextProps) {
    const { selected_album, dispatch } = nextProps
    if (selected_album.album) {
      const { id, name } = selected_album.album
      dispatch(headerActions.setTitle(name))
      dispatch(footerActions.buttonRemove('deleteAlbum'))
      dispatch(footerActions.buttonSet('', 'deleteAlbum', 'danger', {album_id: id, name}))
    }
  }

  render() {
    const { width, selected_album } = this.props

    const scrollbarOptions = {
      wheelSpeed: 1.25,
      // useBothWheelAxes: true
    }
    return (
      <div className="album-info" style={{ width: `${width}px` }}>
        {selected_album.loading &&
          <Spinner type="primary" size={ 70 } />
        }
        {selected_album.err &&
          <div>{selected_album.err}</div>
        }
        {selected_album.album &&
          <PerfectScrollbar
            option={ scrollbarOptions }
            className="album-scrollbar default-scrollbar"
          >
            <div className="selected-album">
              {selected_album.album.id &&
                <Bar
                  album_id={ selected_album.album.id }
                  start_date={ selected_album.album.start_date }
                  end_date={ selected_album.album.end_date }
                />
              }
              
              {selected_album.album.id &&
                <Uploader
                  entity={contentConstants.TYPE_ALBUM}
                  entity_id={selected_album.album.id}
                  status={mediaConstants.STATUS_ENABLED}
                  initial_media={ selected_album.album.media }
                  wrapper_width={ width }
                />
              }

            </div>
          </PerfectScrollbar>
        }
      </div>
    )
  }
}

AlbumInfo.propTypes = {
  selected_album: PropTypes.object.isRequired,
  width: PropTypes.number
}

AlbumInfo.defaultProps = {
  width: 500
}

export default connect()(AlbumInfo)
