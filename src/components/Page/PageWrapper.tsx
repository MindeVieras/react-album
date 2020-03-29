import React, { FunctionComponent } from 'react'
import { Layout } from 'antd'

import MainLayout from '../MainLayout'

export const PageWrapper: FunctionComponent = (props) => {
  return (
    <MainLayout>
      <Layout.Content
        style={{
          paddingLeft: '24px',
          paddingRight: '24px',
          paddingBottom: '16px',
          maxWidth: 1024,
          width: '100%',
          marginTop: 64,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {props.children}
      </Layout.Content>
    </MainLayout>
  )
}
