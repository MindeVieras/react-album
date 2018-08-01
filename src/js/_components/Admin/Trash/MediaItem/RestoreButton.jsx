
import  React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import RestoreIcon from '@material-ui/icons/Restore'

import { trashActions } from '../../../../_actions'

const styles = theme => ({
  button: {
    marginLeft: theme.spacing.unit
  },
  icon: {
    marginRight: theme.spacing.unit / 2
  }
})

class RestoreButton extends Component {

  handleClick() {
    const { dispatch, id } = this.props
    dispatch(trashActions.restore(id))
  }

  render() {

    const { classes } = this.props

    return (
      <Button
        variant="contained"
        size="small"
        color="primary"
        className={ classes.button }
        onClick={() => this.handleClick()}
      >
        <RestoreIcon className={ classes.icon } />
        Restore
      </Button>
    )
  }
}

RestoreButton.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
}

export default connect()(withStyles(styles)(RestoreButton))
