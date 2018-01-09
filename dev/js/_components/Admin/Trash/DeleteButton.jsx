
import  React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { IoTrashA } from 'react-icons/lib/io'

import { trashActions } from '../../../_actions'

class DeleteButton extends Component {

  handleClick() {
    const { id, dispatch } = this.props
    dispatch(trashActions.delete(id))
  }

  render() {
    return (
      <div
        onClick={() => this.handleClick()}
        className="delete-button"
      >
        <IoTrashA />
      </div>
    )
  }
}

DeleteButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
}

export default connect()(DeleteButton)
