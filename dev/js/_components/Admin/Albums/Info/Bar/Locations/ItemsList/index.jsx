
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { IoVideocamera } from 'react-icons/lib/io'

import { albumsActions } from '../../../../../../../_actions'

class ItemsList extends Component {

  constructor(props) {
    super(props)

    this.onAlbumDblClick = this.onAlbumDblClick.bind(this)
    this.onMediaDblClick = this.onMediaDblClick.bind(this)
  }

  onAlbumDblClick() {
    const { album_id, map, dispatch } = this.props
    if (map.edit_enabled)
      dispatch(albumsActions.setLocation(album_id, map.center))
    else
      return
  }

  onMediaDblClick(media_id) {
    const { map, dispatch } = this.props
    if (map.edit_enabled)
      dispatch(albumsActions.setMediaLocation(media_id, map.center))
    else
      return
  }

  render() {
    const { current_location, album_location, media } = this.props
    let albumItem, mediaItems
    
    if (album_location == null) {
      albumItem = <div className="item album-item" onDoubleClick={ this.onAlbumDblClick }>
        Album item
      </div>
    }
    
    if (media) {
      mediaItems = media.map((m, i) =>{
        // console.log(m.location)
        const { media_id, mime } = m
        // console.log(m.mime)
        if (mime.includes('image') && !m.location) {
          return <div key={ i } className="item media-item image" onDoubleClick={ () => this.onMediaDblClick(media_id) }>
            <img src={ m.thumbs.icon } />
          </div>
        }
        if (mime.includes('video') && !m.location) {
          return (
            <div
              key={ i }
              className="item media-item video"
              onDoubleClick={ () => this.onMediaDblClick(media_id) }
              style={{backgroundImage: `url(${m.videos.thumbs.medium})`}}
            >
              <i><IoVideocamera /></i>
            </div>
          )
        }
        else {
          return <span key={ i } />
        }
      })
    }

    return (
      <div className="map-items-list">
        { albumItem }
        { mediaItems }
      </div>
    )
  }

}

ItemsList.propTypes = {
  album_id: PropTypes.number.isRequired,
  current_location: PropTypes.object.isRequired,
  album_location: PropTypes.object,
  media: PropTypes.array,
  map: PropTypes.object
}

function mapStateToProps(state) {
  const { admin_albums } = state
  return {
    map: admin_albums.selected_album.map
  }
}

export default connect(mapStateToProps)(ItemsList)
