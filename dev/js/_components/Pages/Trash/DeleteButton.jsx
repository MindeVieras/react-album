
import  React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { IoTrashA } from 'react-icons/lib/io'
import { RingLoader } from 'react-spinners'

import { trashActions } from '../../../_actions'

class DeleteButton extends Component {

  handleClick() {
    const { id, dispatch } = this.props
    dispatch(trashActions.delete(id))
  }

  render() {
    const { deleting } = this.props
    let content = ''
    if (deleting) {
      content = <RingLoader />
    }
    else {
      content = <IoTrashA />
    }
    return (
      <div
        onClick={() => this.handleClick()}
        className="delete-button"
      >
        { content }
      </div>
    )
  }
}

DeleteButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  deleting: PropTypes.bool
}

DeleteButton.defaultProps = {
  deleting: false
}

export default connect()(DeleteButton)
