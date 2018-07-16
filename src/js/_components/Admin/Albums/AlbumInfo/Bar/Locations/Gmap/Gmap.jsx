
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import { Player } from 'video-react'

import AlbumMarker from './AlbumMarker'

import { albumsActions } from '../../../../../../../_actions'

const albumMarkerIcon = 'https://s3-eu-west-1.amazonaws.com/app.mindelis.com/images/icons/album-marker.png'

class Gmap extends Component {

  constructor(props) {
    super(props)

    this.onMapMounted = this.onMapMounted.bind(this)
    this.onMapDragEnd = this.onMapDragEnd.bind(this)
    this.openMarker = this.openMarker.bind(this)
  }

  componentWillMount() {
    this.refs = {
      map: undefined
    }
  }

  componentDidMount() {
    const { album_location, current_location, dispatch } = this.props
    dispatch(albumsActions.setMapZoom(10))
    let defaultCenter = album_location || current_location
    dispatch(albumsActions.setMapCenter(defaultCenter))
  }

  onMapMounted(ref) {
    this.refs.map = ref
  }

  onMapDragEnd() {
    const { dispatch } = this.props
    const loc = this.refs.map.getCenter()
    const center = {
      lat: loc.lat(),
      lng: loc.lng()
    }
    dispatch(albumsActions.setMapCenter(center))
  }

  removeAlbumLocation() {
    const { album_id, map, dispatch } = this.props
    if (map.edit_enabled)
      dispatch(albumsActions.removeLocation(album_id))
    else
      return
  }

  updateAlbumLocation(loc) {
    const { album_id, dispatch } = this.props
    const album_loc = {
      lat: loc.latLng.lat(),
      lng: loc.latLng.lng()
    }
    dispatch(albumsActions.updateLocation(album_id, album_loc))
  }

  updateMediaLocation(loc, media_id) {
    const { dispatch } = this.props
    const media_loc = {
      lat: loc.latLng.lat(),
      lng: loc.latLng.lng()
    }
    dispatch(albumsActions.updateMediaLocation(media_id, media_loc))
  }

  removeMediaLocation(media_id) {
    const { map, dispatch } = this.props
    if (map.edit_enabled)
      dispatch(albumsActions.removeMediaLocation(media_id))
    else
      return
  }

  openMarker(media_id) {
    const { dispatch } = this.props
    dispatch(albumsActions.closeMediaLocationMarkers())
    dispatch(albumsActions.openMediaLocationMarker(media_id, true))
  }

  render() {
    const { album_location, map, media } = this.props
    let mediaMarkers
    if (media) {
      mediaMarkers = media.map((m, i) => {
        // console.log(m)
        if (m.location) {
          let infoContent
          if (m.mime.includes('image')) {
            infoContent = <img src={ m.thumbs.mini } />
          }
          if (m.mime.includes('video')) {
            infoContent = <div style={{width: '220px', height: '220px'}}>
              <Player playsInline src={ m.videos.video } />
            </div>
          }
          return <Marker
            key={ i }
            position={ m.location }
            draggable={ map.edit_enabled }
            onDblClick={ () => this.removeMediaLocation(m.media_id) }
            onClick={ () => this.openMarker(m.media_id) }
            onDragEnd={ (loc) => this.updateMediaLocation(loc, m.media_id) }
          >
            {m.marker_open &&
              <InfoWindow>
                <div>{ infoContent }</div>
              </InfoWindow>
            }
          </Marker>
        }
      })
    }

    return (
      <div>
        {map &&
          <GoogleMap
            ref={ this.onMapMounted }
            defaultZoom={ map.zoom }
            defaultCenter={ map.center }
            center={ map.center }
            zoom={ map.zoom }
            onDragEnd={ this.onMapDragEnd }
          >
            {album_location &&
              <Marker
                position={ album_location }
                icon={ albumMarkerIcon }
                draggable={ map.edit_enabled }
                onDblClick={ () => this.removeAlbumLocation() }
                onDragEnd={ (loc) => this.updateAlbumLocation(loc) }
              />
            }

            { mediaMarkers }

          </GoogleMap>
        }
      </div>
    )
  }
}

Gmap.propTypes = {
  dispatch: PropTypes.func.isRequired,
  current_location: PropTypes.object.isRequired,
  album_id: PropTypes.number.isRequired,
  media: PropTypes.array,
  album_location: PropTypes.object,
  map: PropTypes.object
}

Gmap.defaultProps = {
  media: [],
  album_location: {},
  map: {}
}

function mapStateToProps(state) {
  const { admin_albums } = state
  return {
    map: admin_albums.selected_album.map
  }
}

export default connect(mapStateToProps)(withGoogleMap(Gmap))
