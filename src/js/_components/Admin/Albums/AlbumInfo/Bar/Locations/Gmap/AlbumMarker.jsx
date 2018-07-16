
import React from 'react'
import PropTypes from 'prop-types'
import { Marker } from 'react-google-maps'

const AlbumMarker = (position) => {
  console.log(position)
  return <Marker position={ position } />
}

AlbumMarker.propTypes = {
  position: PropTypes.object.isRequired
}

export default AlbumMarker
