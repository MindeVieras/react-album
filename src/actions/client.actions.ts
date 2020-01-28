import { Dispatch } from 'redux'

import { ActionTypes } from './types'
import { IScreenDimensions, screenDimensions } from '../helpers'

/**
 * Action type for setting screen dimensions.
 */
export type ActionClientSetDimensions = {
  type: ActionTypes.clientSetDimensions
  payload: IScreenDimensions
}

/**
 * Action type to set client full screen mode.
 */
export type ActionClientSetFullScreen = {
  type: ActionTypes.clientSetFullScreen
  payload: boolean
}

/**
 * Sets dimensions from browser 'window' object.
 */
export const setClientDimensions = () => {
  return (dispatch: Dispatch) => {
    dispatch<ActionClientSetDimensions>({
      type: ActionTypes.clientSetDimensions,
      payload: screenDimensions(),
    })
  }
}

/**
 * Sets fullscreen mode.
 *
 * @param {boolean} fullscreen
 *   True - go to fullscreen mode,
 *   False - exit fullscreen mode.
 */
export const setFullScreen = (fullscreen: boolean) => {
  return (dispatch: Dispatch) => {
    dispatch<ActionClientSetFullScreen>({
      type: ActionTypes.clientSetFullScreen,
      payload: fullscreen,
    })
  }
}
