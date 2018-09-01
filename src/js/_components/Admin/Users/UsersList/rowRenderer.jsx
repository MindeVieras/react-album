
import React from 'react'
import PropTypes from 'prop-types'

import UsersListItem from './UsersListItem'

function rowRenderer ({
  key,         // Unique key within array of rows
  index,       // Index of row within collection
  isScrolling, // The List is currently being scrolled
  isVisible,   // This row is visible within the List (eg it is not an overscanned row)
  parent,      // Reference to the parent List (instance)
  style        // Style object to be applied to row (to position it)
}) {

  const user = parent.props.users[index]

  return (
    <div
      key={key}
      style={style}
    >
      <UsersListItem key={ key } { ...user } />
    </div>
  )
}

rowRenderer.propTypes = {
  key: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  isScrolling: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
  parent: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired
}

export default rowRenderer
