
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Address extends Component {

  constructor(props) {
    super(props)
    let initAddress = props.album_location ? 'Address loading...' : 'Location not set'
    this.state = {
      address: initAddress
    }

    if (props.album_location) {
      this.setFormattedAddress(props.album_location)
    }
  }

  componentWillReceiveProps() {
    const { album_location } = this.props
    if (album_location) {
      this.setFormattedAddress(album_location)
    }
  }

  setFormattedAddress(location) {
    let geocoder = new google.maps.Geocoder
    geocoder.geocode({'location': location}, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
          this.setState({
            // address: getAddress(results[0].address_components)
            address: results[0].formatted_address
          })
        } else {
          console.log('No results found')
        }
      } else {
        console.log('Geocoder failed due to: ' + status)
      }
    }.bind(this))
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
  for (var i = 0; i < addrComponents.length; i++) {
    if (addrComponents[i].types[0] == "country") {
      return addrComponents[i].long_name
    }
    if (addrComponents[i].types.length == 2) {
      if (addrComponents[i].types[0] == "political") {
        return addrComponents[i].short_name
      }
    }
  }
  return false
}

Address.propTypes = {
  album_location: PropTypes.object
}

function mapStateToProps(state) {
  const { admin_albums } = state
  return {
    album_location: admin_albums.selected_album.album.location
  }
}

export default connect(mapStateToProps)(Address)
