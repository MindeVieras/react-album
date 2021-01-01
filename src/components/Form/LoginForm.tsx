import React, { FunctionComponent, ReactNode } from 'react'
import { Dispatch } from 'redux'
import { Field, reduxForm, InjectedFormProps, SubmissionError } from 'redux-form'
import { Translate, I18n } from 'react-redux-i18n'
import validator from 'validator'
import { Alert, Button, Form } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { TextInput, RecaptchaInput } from '../Ui'
import { AuthService } from '../../services'
import { history, config } from '../../helpers'
import { authSet, ActionAuthSet } from '../../actions'

/**
 * Login form values.
 */
export interface IFormLoginValues {
  readonly username?: string
  readonly password?: string
  readonly recaptcha?: string
}

/**
 * Login form component.
 *
 * @param {InjectedFormProps<IFormLoginValues>} props
 *   Login form props.
 */
const LoginForm: FunctionComponent<InjectedFormProps<IFormLoginValues>> = (props) => {
  const { handleSubmit, submitting, error } = props

  return (
    <Form onFinish={handleSubmit(submit)}>
      {/* Username field. */}
      <Field
        name="username"
        component={TextInput}
        formItemProps={{
          required: true,
        }}
        inputProps={{
          size: 'large',
          prefix: <UserOutlined />,
          placeholder: I18n.t('fields.username.label'),
        }}
      />

      {/* Password field. */}
      <Field
        name="password"
        component={TextInput}
        formItemProps={{
          required: true,
        }}
        inputProps={{
          type: 'password',
          size: 'large',
          prefix: <LockOutlined />,
          placeholder: I18n.t('fields.password.label'),
        }}
      />

      {/* Do not render recaptcha field on dev environment. */}
      {!config.isDev && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <Field name="recaptcha" component={RecaptchaInput} />
        </div>
      )}

      {/* Login form submit button. */}
      <Button type="primary" size="large" htmlType="submit" loading={submitting} block>
        <Translate value="button.login" />
      </Button>

      {/* Show form validation error. */}
      {error && <Alert style={{ marginTop: 16 }} message={error} type="error" showIcon />}
    </Form>
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
const submit = async (values: IFormLoginValues, dispatch: Dispatch<ActionAuthSet>) => {
  const { username, password, recaptcha } = values

  // Handle recaptcha error before making request to API.
  // Skip for dev environment.
  if (!recaptcha && !config.isDev) {
    // Throw submission error if recaptcha could not be verified.
    throw new SubmissionError({ _error: <Translate value="fields.recaptcha.invalid" /> })
  }

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

export default reduxForm<IFormLoginValues>({
  form: 'login',
  validate,
})(LoginForm)
