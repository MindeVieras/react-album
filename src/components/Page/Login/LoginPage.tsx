import React, { useEffect, FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import { I18n, Translate } from 'react-redux-i18n'

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import LoginForm from '../../Form/LoginForm'
import { setAppTitle, authClear } from '../../../actions'
import { LanguageSelector } from '../../Ui'

// Login page styles.
const styles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: `10% ${theme.spacing()}px`,
      overflow: 'auto',
      height: '100vh',
    },
    container: {
      maxWidth: theme.spacing(44),
      padding: theme.spacing(3),
      margin: '0 auto',
    },
    titleWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
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
    dispatch(setAppTitle(I18n.t('pages.login.title')))
    // Force user to logout before rendering a form.
    dispatch(authClear())
  }, [dispatch])

  return (
    <div className={classes.root}>
      <Paper className={classes.container}>
        <div className={classes.titleWrapper}>
          <Typography variant="h5" align="center">
            <Translate value="pages.login.title" />
          </Typography>
          <LanguageSelector />
        </div>
        <LoginForm />
      </Paper>
    </div>
  )
}
