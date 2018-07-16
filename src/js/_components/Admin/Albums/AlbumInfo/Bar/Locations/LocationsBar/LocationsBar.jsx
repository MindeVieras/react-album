
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import Switch from '@material-ui/core/Switch'

import green from '@material-ui/core/colors/green'

import { albumsActions } from '../../../../../../../_actions'

const styles = theme => ({
  root: {
    display: `flex`
  },
  switchRoot: {
    height: theme.spacing.unit * 3
  },
  switchSwitchBase: {
    height: theme.spacing.unit * 3,
    color: green[100],
    '&$switchChecked': {
      color: green[500],
      '& + $switchBar': {
        backgroundColor: green[500],
      },
    },
  },
  switchBar: {},
  switchChecked: {},
  searchWrapper: {
    position: `relative`
  },
  searchRoot: {
    padding: 0
  },
  searchInput: {
    minWidth: 300,
    width: `100%`,
    borderRadius: 2,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 14,
    paddingTop: theme.spacing.unit / 4,
    paddingBottom: theme.spacing.unit / 4,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: ['Roboto'].join(','),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  },
  autocompleteWrapper: {
    position: `absolute`,
    zIndex: 1
  }
})

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
    const { classes, map } = this.props

    let tooltipText = t(`Enable map editing`)

    if (map.edit_enabled)
      tooltipText = t(`Disable map editing`)

    return (
      <div className={ classes.root }>

        <PlacesAutocomplete
          value={ this.state.address }
          onChange={ this.handleChange }
          onSelect={ this.handleSelect }
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => (
            <div className={ classes.searchWrapper }>

              <TextField
                id="album_search_locations"
                {...getInputProps({
                  placeholder: t('Search map...')
                })}
                InputProps={{
                  disableUnderline: true,
                  classes: {
                    root: classes.searchRoot,
                    input: classes.searchInput
                  }
                }}
              />

              <div className={ classes.autocompleteWrapper }>
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

        <Tooltip
          id="tooltip_toggle_album_map_edit"
          title={ tooltipText }
          enterDelay={ 500 }
        >
          <Switch
            checked={ map.edit_enabled }
            onChange={ this.handleEditChange }
            color="primary"
            classes={{
              root: classes.switchRoot,
              switchBase: classes.switchSwitchBase,
              checked: classes.switchChecked,
              bar: classes.switchBar
            }}
          />
        </Tooltip>

      </div>
    )
  }
}

LocationsBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
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

export default connect(mapStateToProps)(withStyles(styles)(LocationsBar))
