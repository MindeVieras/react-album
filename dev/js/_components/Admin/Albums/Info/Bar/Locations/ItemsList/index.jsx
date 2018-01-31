
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { albumsActions } from '../../../../../../../_actions'

class ItemsList extends Component {

  onAlbumDblClick() {
    const { album_id, dispatch } = this.props
    // console.log(albums)
    dispatch(albumsActions.setLocation(album_id, location))
  }

  render() {
    const { current_location, album_location, media_locations } = this.props
    let albumItem, mediaItems
    if (album_location == null) {
      albumItem = <div className="item album-item" onDoubleClick={ this.onAlbumDblClick }>
        Album item
      </div>
    }
    if (media_locations && media_locations.list) {
      mediaItems = media_locations.list.map((loc, i) =>{
        return <div key={ i } className="item media-item">
          <img src={ loc.key } />
        </div>
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
  media_locations: PropTypes.object
}

export default connect()(ItemsList)
