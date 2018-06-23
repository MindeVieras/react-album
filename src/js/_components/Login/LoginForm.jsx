
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import renderText from '../Common/Form/Fields'
import RenderButton from '../Common/Form/RenderButton'

import { loginActions } from '../../_actions'

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
    const { classes, handleSubmit, loading, error, msg } = this.props

    return (
      <form onSubmit={ handleSubmit }>
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
          loading={ loading }
          text={ t(`Login`) }
          fullWidth={ true }
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

const validate = values => {
  const errors = {}
  const requiredFields = [
    'username',
    'password'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}

function submit(values, dispatch, form) {
  const { username, password } = values
  dispatch(loginActions.login(username, password))
}

LoginForm.contextTypes = {
  t: PropTypes.func
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.any,
  msg: PropTypes.string
}

LoginForm.defaultProps = {
  loading: false,
  error: false,
  msg: ''
}

function mapStateToProps(state) {
  const { loading, error, msg } = state.auth
  return {
    loading,
    error,
    msg
  }
}

LoginForm = connect(mapStateToProps)(LoginForm)

export default reduxForm({
  form: 'login_form',
  onSubmit: submit,
  validate
})(withStyles(styles)(LoginForm))
