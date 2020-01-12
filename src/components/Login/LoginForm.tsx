import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import validator from 'validator'

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { TextInput, ButtonInput } from '../Ui'
import RecaptchaField from '../Ui/Inputs/RecaptchaField'

import submit from './submit'

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
  const classes = styles()
  const { handleSubmit, submitting, error } = props
  const { t } = ctx

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Field name="username" component={TextInput} label={t('Username')} />
      <Field name="password" component={TextInput} label={t('Password')} type="password" />

      <div className={classes.captcha}>
        <Field name="recaptcha" component={RecaptchaField} />
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

LoginForm.contextTypes = {
  t: PropTypes.func.isRequired,
}

export default reduxForm<IFormLoginValues>({
  form: 'login',
  validate,
})(LoginForm)
