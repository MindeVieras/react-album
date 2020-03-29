import React, { useEffect, FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import { I18n, Translate } from 'react-redux-i18n'
import { Card, PageHeader } from 'antd'

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

import { setAppTitle, authClear } from '../../../actions'

import { LanguageSelector } from '../../Ui'
import LoginForm from '../../Form/LoginForm'

// Login page styles.
const styles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: `10% ${theme.spacing()}px`,
      overflow: 'auto',
      height: '100vh',
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
      <Card
        style={{
          maxWidth: 352,
          margin: '0 auto',
        }}
        bodyStyle={{
          paddingTop: 0,
        }}
      >
        <PageHeader
          onBack={() => null}
          title={<Translate value="pages.login.title" />}
          backIcon={false}
          extra={<LanguageSelector />}
          style={{ paddingLeft: 0, paddingRight: 0 }}
        />
        <LoginForm />
      </Card>
    </div>
  )
}
