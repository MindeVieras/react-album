
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Map from './Map'

class AlbumLocations extends Component {

  render() {
    return (
      <div id="album-map">
        <Map
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `500px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    )
  }

}

// EditForm.propTypes = {
//   name: PropTypes.string.isRequired,
//   id: PropTypes.number.isRequired,
//   dispatch: PropTypes.func
// }

export default connect()(AlbumLocations)
