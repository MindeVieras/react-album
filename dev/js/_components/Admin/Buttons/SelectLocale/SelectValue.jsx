
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class SelectValue extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    const { value } = this.props
    const gravatarStyle = {
      borderRadius: 3,
      display: 'inline-block',
      marginRight: 10,
      position: 'relative',
      top: -2,
      verticalAlign: 'middle',
    }
    return (
      <div className="select-value" title={ value.label }>
        <span className="label">
          { value.value }
        </span>
      </div>
    )
  }
}

SelectValue.propTypes = {
  children: PropTypes.node,
  placeholder: PropTypes.string,
  value: PropTypes.object
}

// DeleteAlbum.defaultProps = {
//   type: 'danger'
// }

export default SelectValue
