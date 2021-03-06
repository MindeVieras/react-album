import React, { FunctionComponent, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import Tooltip, { AbstractTooltipProps } from 'antd/lib/tooltip'

import { IStoreState } from '../../reducers'

/**
 * Tip props.
 */
interface ITipProps extends AbstractTooltipProps {
  content: ReactNode
}

export const Tip: FunctionComponent<ITipProps> = ({ content, children, ...otherProps }) => {
  // Show tooltip only for desktop devices.
  const { type } = useSelector((state: IStoreState) => state.ui.browser.platform)
  const visibleProp = type === 'desktop' ? {} : {
    visible: false
  }
  return (
    <Tooltip title={content} mouseEnterDelay={1} {...visibleProp} {...otherProps}>
      {children}
    </Tooltip>
  )
}
