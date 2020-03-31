import React, { useEffect, FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import { I18n, Translate } from 'react-redux-i18n'
import { Card, PageHeader } from 'antd'

import { setAppTitle, authClear } from '../../../actions'

import { LanguageSelector } from '../../Ui'
import LoginForm from '../../Form/LoginForm'

/**
 * Login page component.
 *
 * @route /login
 *
 * @returns {JSX.Element}
 *   Jsx html page.
 */
export const LoginPage: FunctionComponent = (): JSX.Element => {
  const dispatch = useDispatch()

  useEffect(() => {
    // Set page title.
    dispatch(setAppTitle(I18n.t('pages.login.title')))
    // Force user to logout before rendering a form.
    dispatch(authClear())
  }, [dispatch])

  return (
    <div
      style={{
        padding: `10% 8px`,
        overflow: 'auto',
        height: '100vh',
      }}
    >
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
