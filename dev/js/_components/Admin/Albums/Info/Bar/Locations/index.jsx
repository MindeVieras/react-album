
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Popup from 'react-popup'

import { IoEdit } from 'react-icons/lib/io'

import Address from './Address'
import AlbumMap from './AlbumMap'

class Locations extends Component {

  handleClick() {
    const content = <AlbumMap album_id={ this.props.album_id } />

    Popup.create({
      title: 'Edit album locations',
      content,
      className: 'locations'
    })
  }

  render() {
    return (
      <div className="locations-wrapper">
        <Address />
        <div className="buttons">
          <div className="btn btn-xs btn-info">
            <IoEdit onClick={ () => this.handleClick() } />
          </div>
        </div>
      </div>
    )
  }
}

Locations.propTypes = {
  album_id: PropTypes.number.isRequired
}

export default Locations
