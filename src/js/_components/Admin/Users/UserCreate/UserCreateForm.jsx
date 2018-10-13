
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import validator from 'validator'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

import AutorenewIcon from '@material-ui/icons/Autorenew'

import { renderText, renderSelect, renderToggle, RenderButton } from 'Common'

import submit from './submit'

const styles = theme => ({
  fieldGroup: {
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `center`
  },
  accessLevelField: {
    maxWidth: theme.spacing.unit * 30,
    flex: 1
  },
  statusField: {
    maxWidth: theme.spacing.unit * 12.5,
    marginLeft: theme.spacing.unit * 2
  },
  actionsRoot: {
    display: `flex`,
    alignItems: `center`,
    marginTop: theme.spacing.unit * 2
  },
  resetButton: {
    marginLeft: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit / 2
  },
  auth_error: {
    marginLeft: theme.spacing.unit
  }
})

class UserCreateForm extends Component {

  render() {

    const { t } = this.context
    const { classes, handleSubmit, reset, submitting, error } = this.props
    // console.log(this.props)
    return (
      <form onSubmit={ handleSubmit(submit) }>
        <Field
          name="username"
          component={ renderText }
          label={ t(`Username *`) }
          margin="dense"
        />
        <Field
          name="password"
          component={ renderText }
          label={ t(`Password *`) }
          type="password"
          autoComplete="new-password"
          margin="dense"
        />
        <Field
          name="confirm_password"
          component={ renderText }
          label={ t(`Confirm password`) }
          type="password"
          autoComplete="confirm-new-password"
          margin="dense"
        />
        <Field
          name="email"
          component={ renderText }
          label={ t(`Email`) }
          type="email"
          margin="dense"
        />
        <Field
          name="display_name"
          component={ renderText }
          label={ t(`Display name`) }
          margin="dense"
        />

        <div className={ classes.fieldGroup }>
          <Field
            className={ classes.accessLevelField }
            name="access_level"
            component={ renderSelect }
            label={ t(`Access level`) }
            options={ accessLevelOptions }
            margin="dense"
          />
          <Field
            className={ classes.statusField }
            name="status"
            component={ renderToggle }
            margin="dense"
            onLabel="Active"
            offLabel="Passive"
          />
        </div>

        <div className={ classes.actionsRoot }>

          <RenderButton
            type="submit"
            loading={ submitting }
            text={ t(`Save`) }
            variant="raised"
            color="primary"
          />
          <IconButton
            className={ classes.resetButton }
            onClick={ reset }
            aria-label="Reset form">
            <AutorenewIcon />
          </IconButton>

          {error &&
            <Typography
              className={ classes.auth_error }
              color="error"
            >
              { t(error) }
            </Typography>
          }
        </div>
      </form>
    )
  }
}

const accessLevelOptions = [
  { value: '25', label: 'Viewer' },
  { value: '50', label: 'Editor' },
  { value: '100', label: 'Admin' }
]

// Form validation
const validate = values => {

  const { username, password, confirm_password, email } = values
  const errors = {}

  // vlaidate username
  if (!username || validator.isEmpty(username))
    errors['username'] = `Username is required`
  else if (!validator.isAlphanumeric(username))
    errors['username'] = `Username must be alphanumeric only`
  else if (validator.isLength(username, {min:0, max:4}))
    errors['username'] = `Username must be at least 5 chars long`

  // vlaidate password
  if (!password || validator.isEmpty(password))
    errors['password'] = `Password is required`
  else if (validator.isLength(password, {min:0, max:4}))
    errors['password'] = `Password must be at least 5 chars long`

  // vlaidate confirm password
  if (password && confirm_password && !validator.equals(password, confirm_password))
    errors['confirm_password'] = `Passwords must match`

  // vlaidate email
  if (email && !validator.isEmail(email))
    errors['email'] =  `Email must be valid`

  return errors
}

UserCreateForm.contextTypes = {
  t: PropTypes.func
}

UserCreateForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool
}

UserCreateForm.defaultProps = {
  error: null,
  submitting: false
}

UserCreateForm = connect()(UserCreateForm)

export default reduxForm({
  form: 'user_create_form',
  initialValues: {
    email: '',
    display_name: '',
    access_level: '50',
    status: true
  },
  validate
})(withStyles(styles)(UserCreateForm))
