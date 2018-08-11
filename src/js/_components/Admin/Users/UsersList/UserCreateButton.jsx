
import  React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import AddIcon from '@material-ui/icons/Add'

import { Tip } from 'Common'

import { history } from 'Helpers'

const styles = theme => ({
  button: {
    position: `fixed`,
    right: 0,
    bottom: 0,
    margin: theme.spacing.unit,
    zIndex: theme.zIndex.appBar
  }
})

class UserCreateButton extends Component {

  handleClick() {
    history.push('/admin/users/create')
  }

  render() {

    const { t } = this.context
    const { classes } = this.props

    return (
      <Fragment>
        <Button
          data-tip
          data-for="tip_create_new_user"
          onClick={() => this.handleClick()}
          variant="fab"
          color="primary"
          aria-label="add"
          className={ classes.button }
        >
          <AddIcon />
        </Button>
        <Tip id="tip_create_new_user">{ t(`Create new user`) }</Tip>
      </Fragment>
    )
  }
}

UserCreateButton.contextTypes = {
  t: PropTypes.func
}

UserCreateButton.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(UserCreateButton)
