import React, { FunctionComponent } from 'react'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import validator from 'validator'
import { Dispatch } from 'redux'

// import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
// import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Alert from '@material-ui/lab/Alert'
// import { SubmissionError } from 'redux-form'

// import { authService, ResponseStatus } from '../../services'
// import { history } from '../../helpers'
import { IActionAuthSet } from '../../actions'

import { TextInput, SelectInput } from '../Ui'

export interface IFormUsersCreateValues {
  readonly username?: string
  readonly password?: string
  readonly role?: UserRoles
}

// const styles = makeStyles((theme: Theme) =>
//   createStyles({
//     // error: {
//     //   marginTop: theme.spacing(2),
//     // },
//   }),
// )

const UsersCreateForm: FunctionComponent<InjectedFormProps<IFormUsersCreateValues>> = (props) => {
  // const classes = styles({})
  const { handleSubmit, submitting, error } = props

  return (
    <form onSubmit={handleSubmit(submit)}>
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Field size="lg" name="username" component={TextInput} label="Username" />
        </Grid>
        <Grid item xs={6}>
          <Field name="password" component={TextInput} label="Password" type="password" />
        </Grid>
      </Grid>

      {/* Profile fields */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Field size="xs" name="profile.email" component={TextInput} label="Email" type="email" />
        </Grid>
        <Grid item xs={6}>
          <Field name="profile.displayName" component={TextInput} label="Display name" />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Field name="profile.locale" component={SelectInput} label="Role" />
        </Grid>
        <Grid item xs={6}>
          <Field name="role" component={SelectInput} label="Role" />
        </Grid>
      </Grid>
    </form>
  )
}

/**
 * Form validation function.
 *
 * @param {IFormUsersCreateValues} values
 *   Form values to validate.
 */
const validate = (values: IFormUsersCreateValues) => {
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
 * @param {IFormUsersCreateValues} values
 *   Login form values.
 */
const submit = async (values: IFormUsersCreateValues, dispatch: Dispatch<IActionAuthSet>) => {
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

export default reduxForm<IFormUsersCreateValues>({
  form: 'usersCreate',
  validate,
  onSubmit: submit,
})(UsersCreateForm)
