import React, { ReactNode, FunctionComponent } from 'react'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { Translate, I18n } from 'react-redux-i18n'
import validator from 'validator'
import { Dispatch } from 'redux'
import { Alert, Form, Col, Row } from 'antd'

import Grid from '@material-ui/core/Grid'

// import { authService, ResponseStatus } from '../../services'
// import { history } from '../../helpers'
import { IActionAuthSet } from '../../actions'

import { TextInput, SelectInput } from '../Ui'

/**
 * Add new user form values.
 */
export interface IFormUserAddValues {
  readonly username?: string
  readonly password?: string
  readonly role?: UserRoles
  readonly profile?: {
    readonly displayName: string
    readonly email: string
    readonly locale: string
  }
}

/**
 * Add new user form component.
 *
 * @param {InjectedFormProps<IFormUserAddValues>} props
 *   User add form props.
 */
const UserAddForm: FunctionComponent<InjectedFormProps<IFormUserAddValues>> = (props) => {
  const { handleSubmit, error } = props

  return (
    <Form onFinish={handleSubmit(submit)} layout="vertical">
      {/* Show form validation error. */}
      {error && <Alert style={{ marginBottom: 16 }} message={error} type="error" showIcon />}

      <Row gutter={12}>
        <Col span={12}>
          {/* Username filed. */}
          <Field
            name="username"
            component={TextInput}
            formItemProps={{
              required: true,
              label: <Translate value="fields.username.label" />,
            }}
            inputProps={{
              placeholder: I18n.t('fields.username.label'),
            }}
          />
        </Col>
        <Col span={12}>
          {/* Password field. */}
          <Field
            name="password"
            component={TextInput}
            formItemProps={{
              required: true,
              label: <Translate value="fields.password.label" />,
            }}
            inputProps={{
              type: 'password',
              placeholder: I18n.t('fields.password.label'),
            }}
          />
        </Col>
      </Row>

      <Row gutter={12}>
        <Col span={12}>
          {/* Email filed. */}
          <Field
            name="profile.email"
            component={TextInput}
            formItemProps={{
              label: <Translate value="fields.email.label" />,
            }}
            inputProps={{
              type: 'email',
              placeholder: I18n.t('fields.email.label'),
            }}
          />
        </Col>
        <Col span={12}>
          {/* Display name field. */}
          <Field
            name="profile.displayName"
            component={TextInput}
            formItemProps={{
              label: 'Display name',
            }}
            inputProps={
              {
                // size: 'large',
                // placeholder: I18n.t('fields.password.label'),
              }
            }
          />
        </Col>
      </Row>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Field name="profile.locale" component={SelectInput} label="Role" />
        </Grid>
        <Grid item xs={6}>
          <Field name="role" component={SelectInput} label="Role" />
        </Grid>
      </Grid>
    </Form>
  )
}

type FormErrors = { [fieldName: string]: ReactNode | FormErrors }

/**
 * Form validation function.
 *
 * @param {IFormUserAddValues} values
 *   Form values to validate.
 */
const validate = (values: IFormUserAddValues) => {
  const { username, password, profile } = values

  const errors = {} as { [fieldName: string]: ReactNode }
  const profileErrors = {} as { [fieldName: string]: ReactNode }

  // Validate username.
  if (!username || validator.isEmpty(username)) {
    errors.username = <Translate value="fields.username.required" />
  }

  // Validate password.
  if (!password || validator.isEmpty(password)) {
    errors.password = <Translate value="fields.password.required" />
  }

  // Validate email.
  if (profile) {
    const { email } = profile
    if (email && !validator.isEmail(email)) {
      profileErrors.email = <Translate value="fields.email.invalid" />
    }
  }

  errors.profile = profileErrors
  return errors
}

/**
 * Login form submit handler.
 *
 * @param {IFormUserAddValues} values
 *   Login form values.
 */
const submit = async (values: IFormUserAddValues, dispatch: Dispatch<IActionAuthSet>) => {
  // const { username, password, recaptcha } = values
  console.log(values)
  // // Handle recaptcha error before making a request to the API.
  // if (!recaptcha) {
  //   // Throw submission error if recaptcha could not be verified.
  //   throw new SubmissionError({ _error: 'Cannot validate reCAPTCHA' })
  // }

  // const { status, message, errors, data } = await authService.login(username, password)

  // // Handle client errors.
  // if (status === ResponseStatus.clientError) {
  //   // Throw submission errors to redux form fields.
  //   throw new SubmissionError({ _error: message, ...errors })
  // }

  // // Handle success.
  // if (status === ResponseStatus.success && data) {
  //   // @ts-ignore
  //   dispatch(authSet(data))
  //   history.push('/')
  // }
}

export default reduxForm<IFormUserAddValues>({
  form: 'userAdd',
  validate,
  onSubmit: submit,
})(UserAddForm)
