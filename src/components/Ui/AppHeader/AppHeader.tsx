import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { Layout, Typography } from 'antd'

import { MainMenu, LanguageSelector } from '../Menus'
import { ButtonFullScreen } from './ButtonFullScreen'
import { IStoreState } from '../../../reducers'
import { UiSizes } from '../../../enums'

export const AppHeader: FunctionComponent = () => {
  const appName = useSelector((state: IStoreState) => state.ui.appName)

  return (
    <Layout.Header
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        paddingLeft: 24,
        paddingRight: 24,
        height: UiSizes.headerHeight,
      }}
    >
      <Typography.Title style={{ color: 'inherit', marginBottom: 0, fontWeight: 400 }} level={3}>
        {appName}
      </Typography.Title>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ButtonFullScreen />
        <LanguageSelector buttonProps={{ ghost: true }} />
        <MainMenu />
      </div>
    </Layout.Header>
  )
}
