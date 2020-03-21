import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import validator from 'validator'

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { TextInput, ButtonInput, RecaptchaInput } from '../Ui'
import { Dispatch } from 'redux'
import { SubmissionError } from 'redux-form'

import { authService, ResponseStatus } from '../../services'
import { history } from '../../helpers'
import { authSet, IActionAuthSet } from '../../actions'

export interface IFormLoginValues {
  username: string
  password: string
  recaptcha: string
}

const styles = makeStyles((theme: Theme) =>
  createStyles({
    error: {
      marginTop: theme.spacing(2),
    },
    captcha: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
    },
  }),
)

const LoginForm: FunctionComponent<InjectedFormProps<IFormLoginValues>> = (props, ctx: any) => {
  const classes = styles({})
  const { handleSubmit, submitting, error } = props
  const { t } = ctx

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Field name="username" component={TextInput} label={t('Username')} />
      <Field name="password" component={TextInput} label={t('Password')} type="password" />

      <div className={classes.captcha}>
        <Field name="recaptcha" component={RecaptchaInput} />
      </div>

      <ButtonInput
        loading={submitting}
        text={t('Login')}
        fullWidth={true}
        color="primary"
        size="large"
      />

      {error && (
        <Typography className={classes.error} align="center" color="error">
          {t(error)}
        </Typography>
      )}
    </form>
  )
}

/**
 * Form validation function.
 *
 * @param {IFormLoginValues} values
 *   Form values to validate.
 */
const validate = (values: IFormLoginValues) => {
  const { username, password } = values

  const errors = {} as { [name: string]: string }

  // Validate username.
  if (!username || validator.isEmpty(username)) {
    errors.username = 'Username is required'
  }

  // Validate password.
  if (!password || validator.isEmpty(password)) {
    errors.password = 'Password is required'
  }

  return errors
}

/**
 * Login form submit handler.
 *
 * @param {IFormLoginValues} values
 *   Login form values.
 */
const submit = async (values: IFormLoginValues, dispatch: Dispatch<IActionAuthSet>) => {
  const { username, password, recaptcha } = values

  // Handle recaptcha error before making a request to the API.
  if (!recaptcha) {
    // Throw submission error if recaptcha could not be verified.
    throw new SubmissionError({ _error: 'Cannot validate reCAPTCHA' })
  }

  const { status, message, errors, data } = await authService.login(username, password)

  // Handle client errors.
  if (status === ResponseStatus.clientError) {
    // Throw submission errors to redux form fields.
    throw new SubmissionError({ _error: message, ...errors })
  }

  // Handle success.
  if (status === ResponseStatus.success && data) {
    // @ts-ignore
    dispatch(authSet(data))
    history.push('/')
  }
}

LoginForm.contextTypes = {
  t: PropTypes.func.isRequired,
}

export default reduxForm<IFormLoginValues>({
  form: 'login',
  validate,
})(LoginForm)
