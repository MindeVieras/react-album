import React, { ReactNode, FunctionComponent } from 'react'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { Translate, I18n } from 'react-redux-i18n'
import validator from 'validator'
import { Dispatch } from 'redux'
import { Alert, Form, Col, Row } from 'antd'

// import { authService, ResponseStatus } from '../../services'
import { ActionAuthSet } from '../../actions'

import { TextInput, SelectInput, SwitchInput } from '../Ui'
// import { UsersService } from '../../services'
import { Locale } from '../../helpers'
import { UserRoles, UserStatus } from '../../enums'

/**
 * Add new user form values.
 */
export interface IFormUserAddValues {
  readonly username?: string
  readonly password?: string
  readonly role?: UserRoles
  readonly status?: UserStatus
  readonly profile?: {
    readonly displayName?: string
    readonly email?: string
    readonly locale?: string
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
              label: <Translate value="fields.displayName.label" />,
            }}
            inputProps={{
              placeholder: I18n.t('fields.displayName.label'),
            }}
          />
        </Col>
      </Row>

      <Row gutter={12}>
        <Col span={12}>
          {/* Role filed. */}
          <Field
            name="role"
            component={SelectInput}
            formItemProps={{
              label: <Translate value="fields.role.label" />,
            }}
            selectProps={{
              defaultValue: UserRoles.viewer,
            }}
            options={Object.values(UserRoles).map((role) => {
              return {
                value: role,
                name: role.charAt(0).toUpperCase() + role.slice(1),
              }
            })}
          />
        </Col>
        <Col span={12}>
          {/* Locale field. */}
          <Field
            name="profile.locale"
            component={SelectInput}
            formItemProps={{
              label: <Translate value="fields.locale.label" />,
            }}
            selectProps={{
              showSearch: true,
              optionFilterProp: 'children',
              defaultValue: Locale.getLocalLanguage(),
              placeholder: I18n.t('fields.locale.label'),
            }}
            options={Locale.getAllLanguages().map((l) => {
              return {
                value: l.code,
                name: `${l.name} (${l.nativeName})`,
              }
            })}
          />
        </Col>
      </Row>

      <Row gutter={12}>
        <Col span={12}>
          {/* Status filed. */}
          <Field
            name="status"
            component={SwitchInput}
            formItemProps={{
              label: <Translate value="fields.status.label" />,
            }}
            switchProps={{
              defaultChecked: true,
              checkedChildren:
                UserStatus.active.charAt(0).toUpperCase() + UserStatus.active.slice(1),
              unCheckedChildren:
                UserStatus.blocked.charAt(0).toUpperCase() + UserStatus.blocked.slice(1),
            }}
            checkedValue={UserStatus.active}
            uncheckedValue={UserStatus.blocked}
          />
        </Col>
      </Row>
    </Form>
  )
}

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

  // Validate profile email.
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
const submit = async (values: IFormUserAddValues, dispatch: Dispatch<ActionAuthSet>) => {
  // const { username, password, recaptcha } = values
  console.log(values)

  // Get response from users service.
  // const $users = new UsersService()
  // const { message, errors, data } = await $users.create(values)
  // const t = await $users.create(values)
  // console.log($users.isSuccess)
  // console.log(t)

  // // Dispatch successful response.
  // if ($users.isSuccess && data) {
  //   console.log(data)
  //   // // @ts-ignore
  //   // dispatch(authSet(data))
  //   // // Redirect user to the path where it came from except from /login path.
  //   // let redirectPath = '/'
  //   // if (history.location.state) {
  //   //   redirectPath = history.createHref(history.location.state.from)
  //   // }
  //   // history.push(redirectPath)
  // } else if (!$users.isSuccess && message) {
  //   // Throw submission errors to redux form fields.
  //   throw new SubmissionError({ _error: message, ...errors })
  // }
}

export default reduxForm<IFormUserAddValues>({
  form: 'userAdd',
  validate,
  initialValues: {
    role: UserRoles.viewer,
    status: UserStatus.active,
    profile: {
      locale: Locale.getLocalLanguage(),
    },
  },
  onSubmit: submit,
})(UserAddForm)
