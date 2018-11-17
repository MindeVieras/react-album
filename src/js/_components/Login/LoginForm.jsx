
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import validator from 'validator'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { renderText, RenderButton } from 'Common'

import submit from './submit'

const styles = theme => ({
  auth_error: {
    marginTop: theme.spacing.unit
  },
  btn_submit: {
    marginTop: theme.spacing.unit * 2
  }
})

class LoginForm extends Component {

  render() {

    const { t } = this.context
    const { classes, handleSubmit, error, submitting } = this.props

    return (
      <form onSubmit={ handleSubmit(submit) }>
        <Field
          name="username"
          component={ renderText }
          label={ t(`Username`) }
          type="text"
        />
        <Field
          name="password"
          component={ renderText }
          label={ t(`Password`) }
          type="password"
        />

        <RenderButton
          type="submit"
          loading={ submitting }
          text={ t(`Login`) }
          fullWidth={ true }
          variant="contained"
          color="primary"
          className={ classes.btn_submit }
        />

        {error &&
          <Typography
            className={ classes.auth_error }
            align="center"
            color="error"
          >
            { t(error) }
          </Typography>
        }
      </form>
    )
  }
}

const validate = values => {

  const { username, password } = values
  let errors = {}

  // vlaidate username
  if (!username || validator.isEmpty(username))
    errors['username'] = `Username is required`

  // vlaidate password
  if (!password || validator.isEmpty(password))
    errors['password'] = `Password is required`

  return errors
}

LoginForm.contextTypes = {
  t: PropTypes.func
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool
}

LoginForm.defaultProps = {
  error: null,
  submitting: false
}

export default reduxForm({
  form: 'login_form',
  validate
})(withStyles(styles)(LoginForm))
