import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import Fullscreen from 'react-full-screen'
import { Layout } from 'antd'

import { AppHeader } from './Ui'
import { IStoreState } from '../reducers'

/**
 * Main layout props.
 */
interface IMainLayoutProps {}

/**
 *
 * Main Layout component.
 *
 * @param {IMainLayoutProps} props
 *   Main Layout props.
 */
const MainLayout: FunctionComponent<IMainLayoutProps> = (props) => {
  const fsEnabled = useSelector((state: IStoreState) => state.client.fullScreen)
  return (
    <Fullscreen enabled={fsEnabled}>
      <Layout style={{ height: '100vh' }}>
        <AppHeader />
        {props.children}
      </Layout>
    </Fullscreen>
  )
}

export default MainLayout
