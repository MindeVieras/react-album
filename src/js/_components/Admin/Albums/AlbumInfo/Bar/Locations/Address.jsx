
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Address extends Component {

  constructor(props) {
    super(props)

    this.state = {
      address: props.album_location ? '' : 'Location not set'
    }

    if (props.album_location)
      this.setFormattedAddress(props.album_location)
  }

  componentWillReceiveProps() {
    const { album_location } = this.props
    if (album_location)
      this.setFormattedAddress(album_location)
  }

  setFormattedAddress(location) {
    let geocoder = new google.maps.Geocoder
    geocoder.geocode({'location': location}, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          let { address_components } = results[0]
          this.setState({
            address: getAddress(address_components)
          })
        } else {
          console.log('No results found')
        }
      } else {
        console.log('Geocoder failed due to: ' + status)
      }
    })
  }

  render() {
    return (
      <div className="address">
        { this.state.address }
      </div>
    )
  }
}

function getAddress(addrComponents) {

  let country, city

  addrComponents.map(i => {

    // Make country name
    if (i.types.length == 2 && i.types[0] == 'political') {
      country = i.long_name
    }
    if (i.types[0] == 'country') {
      country =  i.long_name
    }

    // Make city name
    if (i.types[0] == 'locality') {
      city =  i.long_name
    }
    if (!city && i.types[0] == 'administrative_area_level_2') {
      city =  i.long_name
    }
  })

  return city + ', ' + country
}

Address.propTypes = {
  album_location: PropTypes.object
}

Address.defaultProps = {
  album_location: {}
}

function mapStateToProps(state) {
  const { admin_albums } = state
  return {
    album_location: admin_albums.selected_album.album.location
  }
}

export default connect(mapStateToProps)(Address)
