
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import UserCreateForm from './UserCreateForm'

import { headerActions } from 'Actions'

const styles = theme => ({
  root: {
    flex: 1,
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
    padding: theme.spacing.unit * 2
  },
  paperRoot: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: `100%`,
    maxWidth: theme.spacing.unit * 60
  }
})

class UserCreate extends Component {

  componentDidMount(){
    const { dispatch } = this.props

    dispatch(headerActions.setTitle('Create new user'))
  }

  render() {

    const { classes } = this.props

    return (
      <div className={ classes.root }>
        <Paper
          classes={{
            root: classes.paperRoot
          }}
        >
          <UserCreateForm />
        </Paper>
      </div>
    )
  }
}

UserCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

export default connect()(withStyles(styles)(UserCreate))
