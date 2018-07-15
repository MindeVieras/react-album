
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
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleEditChange(e) {
    const { dispatch } = this.props
    const edit = e.target.checked
    dispatch(albumsActions.setMapEdit(edit))
  }

  handleChange(address) {
    this.setState({ address })
  }

  handleSelect() {
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
    const { t } = this.context
    const { map } = this.props

    return (
      <div className="locations-bar">

        <PlacesAutocomplete
          value={ this.state.address }
          onChange={ this.handleChange }
          onSelect={ this.handleSelect }
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => (
            <div className="search-input-group">
              <input
                {...getInputProps({
                  placeholder: t('Search...'),
                  className: 'search-input'
                })}
              />
              <div className="search-autocomplete-container">
                {suggestions.map(suggestion => {
                  const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item'
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' }
                  return (
                    <div {...getSuggestionItemProps(suggestion, { className, style })}>
                      <span>{suggestion.description}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>

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
  dispatch: PropTypes.func.isRequired,
  map: PropTypes.object
}

LocationsBar.defaultProps = {
  map: {}
}

LocationsBar.contextTypes = {
  t: PropTypes.func
}

function mapStateToProps(state) {
  const { client, admin_albums } = state
  return {
    map: admin_albums.selected_album.map
  }
}

export default connect(mapStateToProps)(LocationsBar)
