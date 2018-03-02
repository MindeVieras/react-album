
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Map from './Map'
import LocationsBar from './LocationsBar'
import ItemsList from './ItemsList'

class AlbumMap extends Component {
  
  render() {
    const { album_id, current_location, album_location } = this.props

    return (
      <div>
        {current_location &&
          <div id="album_map">
            <LocationsBar />
            <Map
              containerElement={<div className="map-container" />}
              mapElement={<div style={{ height: `100%` }} />}
              album_location={ album_location }
              current_location={ current_location }
              album_id={ album_id }
            />
            <ItemsList
              album_id={ album_id }
              current_location={ current_location }
              album_location={ album_location }
            />
          </div>
        }
      </div>
    )
  }

}

AlbumMap.propTypes = {
  album_id: PropTypes.number.isRequired,
  album_location: PropTypes.object,
  current_location: PropTypes.object
}

function mapStateToProps(state) {
  const { client, admin_albums } = state
  return {
    current_location: client.location,
    album_location: admin_albums.selected_album.album.location
  }
}

export default connect(mapStateToProps)(AlbumMap)
