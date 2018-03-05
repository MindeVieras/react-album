
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

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
        const { media_id } = m
        if (!m.location) {        
          return <div key={ i } className="item media-item" onDoubleClick={ () => this.onMediaDblClick(media_id) }>
            <img src={ m.thumbs.icon } />
          </div>
        }
        else {
          return <span key={ i } />
        }
      })
    }

    const total = albumItem + mediaItems
    
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
  media: PropTypes.array,
  current_location: PropTypes.object.isRequired,
  album_location: PropTypes.object,
  map: PropTypes.object
}

function mapStateToProps(state) {
  const { client, admin_albums } = state
  return {
    map: admin_albums.selected_album.map,
    media: admin_albums.selected_album.album.media
  }
}

export default connect(mapStateToProps)(ItemsList)
