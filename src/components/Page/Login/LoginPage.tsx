import React, { useEffect, FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import LoginForm from '../../Form/LoginForm'
import { setAppTitle, authClear } from '../../../actions'

// Login page styles.
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
 * @route /login
 *
 * @returns {JSX.Element}
 *   Jsx html page.
 */
export const LoginPage: FunctionComponent = (): JSX.Element => {
  const classes = styles({})
  const dispatch = useDispatch()

  useEffect(() => {
    // Set page title.
    dispatch(setAppTitle('Login'))
    // Force user to logout before rendering a form.
    dispatch(authClear())
  }, [dispatch])

  return (
    <div className={classes.root}>
      <Paper className={classes.container}>
        <LoginForm />
      </Paper>
    </div>
  )
}
