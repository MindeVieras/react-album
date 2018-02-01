
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Map from './Map'
import ItemsList from './ItemsList'

import { albumsActions } from '../../../../../../_actions'

class AlbumMap extends Component {
  
  componentDidMount(){
    const { album_id, dispatch } = this.props
    // console.log(albums)
    dispatch(albumsActions.getLocations(album_id))
  }
  
  render() {
    const { album_id, current_location, album_location, media_locations } = this.props
    // console.log(album_location)
    const mapHeight = { height: `600px`}
    return (
      <div style={ mapHeight }>
        {current_location &&
          <div id="album_map">
            <Map
              containerElement={<div className="map-container" style={ mapHeight } />}
              mapElement={<div style={{ height: `100%` }} />}
              album_location={ album_location }
              current_location={ current_location }
              album_id={ album_id }
            />
            <ItemsList
              album_id={ album_id }
              current_location={ current_location }
              album_location={ album_location }
              media_locations={ media_locations }
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
  media_locations: PropTypes.object,
  current_location: PropTypes.object
}

function mapStateToProps(state) {
  const { client, admin_albums } = state
  return {
    current_location: client.location,
    album_location: admin_albums.selected_album.album.location,
    media_locations: admin_albums.selected_album.locations
  }
}

export default connect(mapStateToProps)(AlbumMap)
