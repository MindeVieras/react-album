
import  React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'

import RestoreIcon from '@material-ui/icons/Restore'

import { trashActions } from '../../../../_actions'

class RestoreButton extends Component {

  handleClick() {
    const { id, dispatch } = this.props
    dispatch(trashActions.restore(id))
  }

  render() {
    return (
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={() => this.handleClick()}
      >
        <RestoreIcon />
        Restore
      </Button>
    )
  }
}

RestoreButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
}

export default connect()(RestoreButton)
