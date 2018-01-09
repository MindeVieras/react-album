
import  React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { IoBackspace } from 'react-icons/lib/io'
import { RingLoader } from 'react-spinners'

import { trashActions } from '../../../_actions'

class RestoreButton extends Component {

  handleClick() {
    const { id, dispatch } = this.props
    dispatch(trashActions.restore(id))
  }

  render() {
    const { restoring } = this.props
    let content = ''
    if (restoring) {
      content = <RingLoader />
    }
    else {
      content = <IoBackspace />
    }
    return (
      <div
        onClick={() => this.handleClick()}
        className="restore-button"
      >
        { content }
      </div>
    )
  }
}

RestoreButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  restoring: PropTypes.bool
}

RestoreButton.defaultProps = {
  restoring: false
}

export default connect()(RestoreButton)
