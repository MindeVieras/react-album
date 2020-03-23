import React, { FunctionComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import validator from 'validator'

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'

import { TextInput, ButtonInput, RecaptchaInput } from '../Ui'
import { Dispatch } from 'redux'
import { SubmissionError } from 'redux-form'

import { AuthService } from '../../services'
import { history, config } from '../../helpers'
import { authSet, IActionAuthSet } from '../../actions'

/**
 * Login form values.
 */
export interface IFormLoginValues {
  readonly username?: string
  readonly password?: string
  readonly recaptcha?: string
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

const LoginForm: FunctionComponent<InjectedFormProps<IFormLoginValues>> = (props) => {
  const classes = styles({})
  const { handleSubmit, submitting, error, submitSucceeded } = props

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Field name="username" component={TextInput} label="Username" />
      <Field name="password" component={TextInput} label="Password" type="password" />

      {/* Do not render recaptcha field on dev environment. */}
      {!config.isDev && (
        <div className={classes.captcha}>
          <Field name="recaptcha" component={RecaptchaInput} />
        </div>
      )}

      <ButtonInput
        loading={submitting}
        text="Login"
        fullWidth={true}
        color="primary"
        size="large"
      />
      {submitSucceeded && <Redirect to="/" />}

      {error && <Alert severity="error">{error}</Alert>}
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

  // Handle recaptcha error before making request to API.
  // Skip for dev environment.
  if (!recaptcha && !config.isDev) {
    // Throw submission error if recaptcha could not be verified.
    throw new SubmissionError({ _error: 'Cannot validate reCAPTCHA' })
  }

  if (username && password) {
    // Get response from auth login service.
    const $auth = new AuthService()
    const { message, errors, data } = await $auth.login({ username, password })

    // Dispatch successful response.
    if ($auth.isSuccess && data) {
      // @ts-ignore
      dispatch(authSet(data))
      history.push('/')
    } else if (!$auth.isSuccess && message) {
      // Throw submission errors to redux form fields.
      throw new SubmissionError({ _error: message, ...errors })
    }
  }
}

export default reduxForm<IFormLoginValues>({
  form: 'login',
  validate,
})(LoginForm)
