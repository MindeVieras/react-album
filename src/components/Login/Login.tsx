import React from 'react'

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import LoginForm from './LoginForm'
import { authService } from '../../services'

const styles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: `10% ${theme.spacing()}px`,
      overflow: 'auto',
      height: '100vh',
    },
    container: {
      maxWidth: theme.spacing(45),
      padding: theme.spacing(3),
      margin: '0 auto',
    },
  }),
)

/**
 * Login page component.
 *
 * @param {Props} props
 *   Component props.
 *
 * @returns {JSX.Element}
 *   Jsx html page.
 */
const Login = (): JSX.Element => {
  const classes = styles()

  // Force user to logout before rendering a form.
  authService.logout()

  return (
    <div className={classes.root}>
      <Paper className={classes.container}>
        <LoginForm />
      </Paper>
    </div>
  )
}

export default Login
