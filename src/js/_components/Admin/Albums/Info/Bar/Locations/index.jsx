
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
      title: null,
      content,
      className: 'locations-popup',
      position: function (box) {

        let leftPadding = 5 // percents
        let topPadding  = 5 // percents
        let popupWidth  = 100 - (leftPadding * 2)
        let popupHeight = 100 - (topPadding * 2)

        box.style.top     = topPadding+'%'
        box.style.left    = leftPadding+'%'
        box.style.width   = popupWidth+'%'
        box.style.height  = popupHeight+'%'
        box.style.margin  = 0
        box.style.opacity = 1
      }
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
