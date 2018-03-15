
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { IoCloseCircled } from 'react-icons/lib/io'

import { uploaderActions } from '../../../../../../_actions'

class RemoveButton extends Component {

  handleClick() {
    const { media_id, dispatch } = this.props
    dispatch(uploaderActions.trashFile(media_id))
  }

  render() {
    return (
      <div
        className="remove-button"
        onClick={ () => this.handleClick() }
      >
        <IoCloseCircled />
      </div>
    )
  }
}

RemoveButton.propTypes = {
  media_id: PropTypes.number.isRequired
}

export default connect()(RemoveButton)
