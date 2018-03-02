
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Toggle from 'react-toggle'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import { albumsActions } from '../../../../../../../_actions'

class LocationsBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      address: ''
    }

    this.handleEditChange = this.handleEditChange.bind(this)
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  handleEditChange(e) {
    const { dispatch } = this.props
    const edit = e.target.checked
    dispatch(albumsActions.setMapEdit(edit))
  }

  onChange(address) {
    this.setState({ address })
  }

  handleSubmit() {
    const { dispatch } = this.props

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        dispatch(albumsActions.setMapZoom(15))
        dispatch(albumsActions.setMapCenter(latLng))
      })
      .catch(error => console.error('Error', error))
  }

  render() {
    
    const { map } = this.props

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
    
    // console.log(this.state)
    
    return (
      <div className="locations-bar">
        <PlacesAutocomplete
          inputProps={ inputProps }
          classNames={ cssClasses }
          onEnterKeyDown={ this.handleSubmit }
          onSelect={ this.handleSubmit }
        />
        <div className="controls">
          <Toggle
            defaultChecked={ map.edit_enabled }
            onChange={ this.handleEditChange }
            className="edit-switch"
          />
        </div>
      </div>
    )
  }
}

LocationsBar.propTypes = {
  map: PropTypes.object
}

function mapStateToProps(state) {
  const { client, admin_albums } = state
  return {
    map: admin_albums.selected_album.map
  }
}

export default connect(mapStateToProps)(LocationsBar)
