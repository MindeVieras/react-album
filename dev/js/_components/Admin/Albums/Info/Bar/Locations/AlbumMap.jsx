
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Map from './Map'
import LocationsBar from './LocationsBar'
import ItemsList from './ItemsList'

class AlbumMap extends Component {
  
  render() {
    const { album_id, current_location, album_location, media } = this.props
    let mediaItems = 0, mapWidth = '100%'

    if (!album_location) { mediaItems++ }
    media.map(m => {
      if (!m.location) { mediaItems++ }
    })
    
    if (mediaItems) { mapWidth = 'calc(100% - 60px)' }

    return (
      <div>
        {current_location &&
          <div id="album_map">
            <LocationsBar />
            <Map
              containerElement={<div className="map-container" style={{width: mapWidth}} />}
              mapElement={<div style={{ height: `100%` }} />}
              album_location={ album_location }
              current_location={ current_location }
              album_id={ album_id }
              media={ media }
            />
            {mediaItems &&
              <ItemsList
                album_id={ album_id }
                current_location={ current_location }
                album_location={ album_location }
                media={ media }
              />
            }
          </div>
        }
      </div>
    )
  }

}

AlbumMap.propTypes = {
  album_id: PropTypes.number.isRequired,
  album_location: PropTypes.object,
  current_location: PropTypes.object,
  media: PropTypes.array,
}

AlbumMap.defaultProps = {
  media: []
}

function mapStateToProps(state) {
  const { client, admin_albums } = state
  return {
    current_location: client.location,
    album_location: admin_albums.selected_album.album.location,
    media: admin_albums.selected_album.album.media
  }
}

export default connect(mapStateToProps)(AlbumMap)
