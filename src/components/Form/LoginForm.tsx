import React, { FunctionComponent, ReactNode } from 'react'
import { Redirect } from 'react-router-dom'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { Translate } from 'react-redux-i18n'
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

/**
 * Login form styles.
 */
const styles = makeStyles((theme: Theme) =>
  createStyles({
    captcha: {
      display: 'flex',
      justifyContent: 'center',
    },
  }),
)

/**
 * Login form component.
 *
 * @param {InjectedFormProps<IFormLoginValues>} props
 *   Form props.
 */
const LoginForm: FunctionComponent<InjectedFormProps<IFormLoginValues>> = (props) => {
  const classes = styles({})
  const { handleSubmit, submitting, error, submitSucceeded } = props

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Field
        name="username"
        component={TextInput}
        label={<Translate value="fields.username.label" />}
      />
      <Field
        name="password"
        component={TextInput}
        label={<Translate value="fields.password.label" />}
        type="password"
      />

      {/* Do not render recaptcha field on dev environment. */}
      {!config.isDev && (
        <div className={classes.captcha}>
          <Field name="recaptcha" component={RecaptchaInput} />
        </div>
      )}

      <ButtonInput
        loading={submitting}
        text={<Translate value="pages.login.submit" />}
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

  const errors = {} as { [fieldName: string]: ReactNode }

  // Validate username.
  if (!username || validator.isEmpty(username)) {
    errors.username = <Translate value="fields.username.required" />
  }

  // Validate password.
  if (!password || validator.isEmpty(password)) {
    errors.password = <Translate value="fields.password.required" />
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
    throw new SubmissionError({ _error: <Translate value="fields.recaptcha.invalid" /> })
  }

  if (username && password) {
    // Get response from auth login service.
    const $auth = new AuthService()
    const { message, errors, data } = await $auth.login({ username, password })

    // Dispatch successful response.
    if ($auth.isSuccess && data) {
      // @ts-ignore
      dispatch(authSet(data))

      // Redirect user to the path where it came from except from /login path.
      let redirectPath = '/'
      if (history.location.state) {
        redirectPath = history.createHref(history.location.state.from)
      }
      history.push(redirectPath)
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
