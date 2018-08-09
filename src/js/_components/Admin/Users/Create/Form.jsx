
import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { IoIosCheckmark, IoCloseCircled } from 'react-icons/lib/io'

import Select from 'react-select'
import Toggle from 'react-toggle'

import { userService } from 'Services'
import { userActions } from 'Actions'
// import { history } from 'Helpers'

class UserCreateForm extends React.Component {
  render() {

    const { handleSubmit } = this.props
    // console.log(this.props);
    return (
      <form id="user_create_form" onSubmit={handleSubmit}>
        <Field
          name="username"
          type="text"
          component={textField}
          label="Username"
          id="username_field"
        />
        <Field
          name="display_name"
          type="text"
          component={textField}
          label="Display name"
          id="display_name_field"
        />
        <Field
          name="email"
          type="email"
          component={textField}
          label="Email"
          id="email_field"
        />
        <Field
          name="password"
          type="password"
          component={textField}
          label="Password"
          id="password_field"
        />
        <Field
          value="50"
          name="access_level"
          component={selectField}
          label="Access level"
        />
        <Field
          name="status"
          component={toggleField}
          label="Status"
        />
      </form>
    )
  }
}

const textField = ({ input, label, id, type }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <input {...input} className="form-control" placeholder={label} type={type} id={id} autoComplete="new-password" />
  </div>
)

const accessLevelOptions = [
  { value: '100', label: 'Administrator' },
  { value: '50', label: 'Simple user' }
]

const selectField = ({ input, label}) => (
  <div className="form-group">
    <label>{label}</label>
    <Select
      {...input}
      value={input.value}
      options={accessLevelOptions}
      onChange={value => input.onChange(value.value)}
      onBlur={() => input.onBlur(input.value)}
    />
  </div>
)

const toggleField = ({ input, label }) => (
  <div className="form-group">
    <label>
      <label>{label}</label>
      <Toggle
        {...input}
        value="yes"
        defaultChecked={input.value || true}
        onChange={() => input.onChange(input.value)}
        icons={{
          checked: <IoIosCheckmark />,
          unchecked: <IoCloseCircled />,
        }}
      />
    </label>
  </div>
)

function submit(values, dispatch, form) {
  // console.log(values);
  userService.create({...values, author: form.userid, avatar: form.avatar})
    .then(res => {
      if (res.ack == 'ok') {
        // dispatch(alertActions.success('Registration successful'))
        form.reset()
      } else {
        // dispatch(alertActions.error(res.msg))
      }
    })
}

const connectedUserCreateForm = reduxForm({
  form: 'user_create',
  initialValues: {
    username: '',
    password: '',
    email: '',
    access_level: '50',
    status: true
  },
  onSubmit: submit
})(UserCreateForm)
export { connectedUserCreateForm as UserCreateForm }
