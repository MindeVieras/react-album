
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

import AlbumMarker from './AlbumMarker'

import { albumsActions } from '../../../../../../../_actions'

const albumMarkerIcon = 'https://s3-eu-west-1.amazonaws.com/app.mindelis.com/images/icons/album-marker.png'

class Map extends Component {
  
  constructor(props) {
    super(props)
  }

  removeAlbumLocation() {
    const { album_id, dispatch } = this.props
    dispatch(albumsActions.removeLocation(album_id))
  }

  updateAlbumLocation(loc) {
    const { album_id, dispatch } = this.props
    const album_loc = {
      lat: loc.latLng.lat(),
      lng: loc.latLng.lng()
    }
    dispatch(albumsActions.updateLocation(album_id, album_loc))
  }

  render() {
    const { album_location, current_location } = this.props
    return (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={album_location || current_location}
        //onDragEnd={ (l) => console.log(l) }
      >
        {album_location &&
          <Marker
            position={ album_location }
            icon={ albumMarkerIcon }
            draggable={ true }
            onDblClick={ () => this.removeAlbumLocation() }
            onDragEnd={ (loc) => this.updateAlbumLocation(loc) }
          />
        }
      </GoogleMap>
    )
  }

  // methods
}

Map.propTypes = {
  current_location: PropTypes.object.isRequired,
  album_id: PropTypes.number.isRequired,
  album_location: PropTypes.object
}

export default connect()(withGoogleMap(Map))
