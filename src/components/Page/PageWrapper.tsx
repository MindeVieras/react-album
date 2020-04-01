import React, { FunctionComponent, ReactNode } from 'react'
import { Layout } from 'antd'

import MainLayout from '../MainLayout'

interface IPageWrapperProps {
  sidebar?: ReactNode
}

export const PageWrapper: FunctionComponent<IPageWrapperProps> = (props) => {
  return (
    <MainLayout>
      {props.sidebar && (
        <Layout.Sider theme="light" style={{ marginTop: 64 }}>
          {props.sidebar}
        </Layout.Sider>
      )}
      <Layout.Content
        style={{
          backgroundColor: 'white',
          paddingLeft: '24px',
          paddingRight: '24px',
          paddingBottom: '16px',
          maxWidth: props.sidebar ? 'none' : 1024,
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
