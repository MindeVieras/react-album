import React, { FunctionComponent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Translate } from 'react-redux-i18n'
import { Button } from 'antd'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'

import { IStoreState } from '../../../reducers'
import { setFullScreen } from '../../../actions'
import { Tip } from '../Tip'

/**
 * Full screen button props.
 */
interface IButtonFullScreenProps { }

/**
 * Full Screen Button component.
 *
 * @param props
 */
export const ButtonFullScreen: FunctionComponent<IButtonFullScreenProps> = () => {
  const dispatch = useDispatch()
  const isFullScreen = useSelector((state: IStoreState) => state.ui.fullScreen)

  /**
   * Event on full screen button click.
   */
  const handleClick = () => {
    dispatch(setFullScreen(!isFullScreen))
  }

  return (
    <Tip content={<Translate value="tooltip.goFullScreen" />}>
      <Button
        type="link"
        onClick={handleClick}
        shape="circle"
        size="large"
        icon={isFullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
      />
    </Tip>
  )
}
