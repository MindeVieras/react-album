import React from 'react'
import { connect } from 'react-redux'

import IconButton from '@material-ui/core/IconButton'
import Fullscreen from '@material-ui/icons/Fullscreen'
import FullscreenExit from '@material-ui/icons/FullscreenExit'

import { IStoreState } from '../../reducers'
import { setFullScreen } from '../../actions'

/**
 * Full screen button props.
 */
interface IButtonFullScreenComponentProps {
  isFullScreen: boolean
  setFullScreen: Function
}

/**
 * Full Screen Button component.
 *
 * @param props
 */
const ButtonFullScreenComponent = (props: IButtonFullScreenComponentProps) => {
  const handleClick = () => {
    props.setFullScreen(!props.isFullScreen)
  }

  return (
    <IconButton
      onClick={handleClick}
      color="inherit"
      aria-controls="full-screen"
      aria-haspopup="true"
    >
      {!props.isFullScreen && <Fullscreen />}
      {props.isFullScreen && <FullscreenExit />}
    </IconButton>
  )
}

/**
 * Create props for the component from the redux store.
 *
 * @param {IStoreState} state
 *   Global redux state.
 */
const mapStateToProps = (state: IStoreState) => {
  return {
    isFullScreen: state.client.fullScreen,
  }
}

export const ButtonFullScreen = connect(mapStateToProps, { setFullScreen })(
  ButtonFullScreenComponent,
)
