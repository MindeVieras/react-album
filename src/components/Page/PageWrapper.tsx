import React, { FunctionComponent, ReactNode } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Rnd, RndResizeCallback } from 'react-rnd'
import { Layout } from 'antd'

import MainLayout from '../MainLayout'
import { UiSizes } from '../../enums'
import { IStoreState } from '../../reducers'
import { setSiderWidth } from '../../actions'

/**
 * Page wrapper props.
 */
interface IPageWrapperProps {
  sidebar?: ReactNode
}

export const PageWrapper: FunctionComponent<IPageWrapperProps> = ({ sidebar, children }) => {
  const dispatch = useDispatch()

  const windowSize = useSelector((state: IStoreState) => state.ui.dimensions)
  const sidebarWidth = useSelector((state: IStoreState) => state.ui.siderWidth)

  const onSiderResize: RndResizeCallback = (e, direction, ref) => {
    const width = ref.offsetWidth
    dispatch(setSiderWidth(width))
  }

  const onSiderResizeEnd: RndResizeCallback = (e, direction, ref) => {
    const width = ref.offsetWidth
    dispatch(setSiderWidth(width, true))
  }

  return (
    <MainLayout>
      {sidebar && (
        <Layout.Sider
          theme="light"
          width={sidebarWidth}
          style={{
            overflow: 'auto',
            position: 'fixed',
            top: UiSizes.headerHeight,
            bottom: 0,
            left: 0,
          }}
        >
          <Rnd
            default={{
              x: 0,
              y: 0,
              width: sidebarWidth,
              height: windowSize.height - UiSizes.headerHeight,
            }}
            enableResizing={{
              top: false,
              right: true,
              bottom: false,
              left: false,
              topRight: false,
              bottomRight: false,
              bottomLeft: false,
              topLeft: false,
            }}
            minWidth={200}
            maxWidth={350}
            disableDragging={true}
            onResize={onSiderResize}
            onResizeStop={onSiderResizeEnd}
            style={{
              borderRight: '2px solid grey',
              overflow: 'hidden',
            }}
          >
            {sidebar}
          </Rnd>
        </Layout.Sider>
      )}
      <Layout.Content
        style={{
          backgroundColor: 'white',
          paddingLeft: sidebar ? 0 : '24px',
          paddingRight: sidebar ? 0 : '24px',
          paddingBottom: sidebar ? 0 : '16px',
          maxWidth: sidebar ? 'none' : 1024,
          width: '100%',
          marginTop: UiSizes.headerHeight,
          marginLeft: sidebar ? sidebarWidth : 'auto',
          marginRight: 'auto',
        }}
      >
        {children}
      </Layout.Content>
    </MainLayout>
  )
}
