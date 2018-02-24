
import React, { Component } from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

class LocationsBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      address: ''
    }

    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onChange(address) {
    this.setState({ address })
  }

  handleSubmit() {
    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

  render() {
    
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      placeholder: 'Search...'
    }

    const cssClasses = {
      root: 'search-input-group',
      input: 'search-input',
      autocompleteContainer: 'search-autocomplete-container'
    }
    
    console.log(this.state)
    
    return (
      <div className="locations-bar">
        <PlacesAutocomplete
          inputProps={ inputProps }
          classNames={ cssClasses }
          onEnterKeyDown={ this.handleSubmit }
          onSelect={ this.handleSubmit }
        />
      </div>
    )
  }
}

export default LocationsBar
