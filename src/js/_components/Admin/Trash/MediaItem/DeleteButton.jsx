
import  React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

import { IoTrashA } from 'react-icons/lib/io'

import { trashActions } from 'Actions'

const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit / 2
  }
})

class DeleteButton extends Component {

  handleClick() {
    const { id, dispatch } = this.props
    dispatch(trashActions.delete(id))
  }

  render() {

    const { classes } = this.props

    return (
      <Button
        variant="contained"
        size="small"
        color="secondary"
        onClick={() => this.handleClick()}
      >
        <DeleteForeverIcon className={ classes.icon } />
        Delete
      </Button>
    )
  }
}

DeleteButton.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
}

export default connect()(withStyles(styles)(DeleteButton))
