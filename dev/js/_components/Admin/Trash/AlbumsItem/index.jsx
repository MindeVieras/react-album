
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Spinner from '../../Partials/Spinner'

import DeleteButton from './DeleteButton'
import RestoreButton from './RestoreButton'

class AlbumsItem extends Component {
  
  render() {
    const { album } = this.props
    return (
      <li className="trash-item">
        { album.name }
        <DeleteButton id={ album.id } />
        <RestoreButton id={ album.id } restoring={ album.restoring } />
        {album.deleting &&
          <Spinner type="list-item" size={ 30 } />
        }
      </li>
    )
  }
}

AlbumsItem.propTypes = {
  album: PropTypes.object.isRequired
}

export default AlbumsItem
