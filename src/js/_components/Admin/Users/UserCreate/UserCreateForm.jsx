
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { renderText, renderSelect, RenderButton } from 'Common'

import { loginActions } from 'Actions'

const styles = theme => ({
  auth_error: {
    marginTop: theme.spacing.unit
  },
  btn_submit: {
    marginTop: theme.spacing.unit * 2
  }
})

class UserCreateForm extends Component {

  render() {

    const { t } = this.context
    const { classes, handleSubmit, loading, error, msg } = this.props

    return (
      <form onSubmit={ handleSubmit }>
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
        <Field
          name="access_level"
          component={ renderSelect }
          label={ t(`Access level *`) }
          options={ accessLevelOptions }
          margin="dense"
        />

        <RenderButton
          type="submit"
          loading={ loading }
          text={ t(`Save`) }
          variant="raised"
          color="primary"
          className={ classes.btn_submit }
        />

        {error &&
          <Typography
            className={ classes.auth_error }
            align="center"
            color="error"
          >
            { t(msg) }
          </Typography>
        }
      </form>
    )
  }
}

const accessLevelOptions = [
  { value: '25', label: 'Viewer' },
  { value: '50', label: 'Editor' },
  { value: '100', label: 'Admin' }
]

const validate = values => {
  const errors = {}
  const requiredFields = [
    'username',
    'access_level',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}

function submit(values, dispatch, form) {
  console.log(values)
  // const { username, password } = values
  // dispatch(loginActions.login(username, password))
}

UserCreateForm.contextTypes = {
  t: PropTypes.func
}

UserCreateForm.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.any,
  msg: PropTypes.string
}

UserCreateForm.defaultProps = {
  loading: false,
  error: false,
  msg: ''
}

function mapStateToProps(state) {
  const { loading, err, msg } = state.users.create_user
  return {
    loading
  }
}

UserCreateForm = connect(mapStateToProps)(UserCreateForm)

export default reduxForm({
  form: 'user_create_form',
  onSubmit: submit,
  initialValues: {
    email: '',
    display_name: '',
    access_level: '50',
  },
  validate
})(withStyles(styles)(UserCreateForm))
