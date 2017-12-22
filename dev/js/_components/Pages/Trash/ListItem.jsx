
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import DeleteButton from './DeleteButton'
import RestoreButton from './RestoreButton'

class ListItem extends Component {
  
  render() {
    const { media } = this.props
    return (
      <li className="trash-item">
        { media.org_filename }
        <DeleteButton id={ media.id } deleting={ media.deleting } />
        <RestoreButton id={ media.id } restoring={ media.restoring } />
      </li>
    )
  }
}

ListItem.propTypes = {
  media: PropTypes.object.isRequired
}

export default ListItem
