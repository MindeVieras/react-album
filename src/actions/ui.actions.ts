import { Dispatch } from 'redux'

import { ActionTypes } from './types'
import { IScreenDimensions, screenDimensions } from '../helpers'

/**
 * Action type for setting app title.
 */
export type ActionUiSetAppTitle = {
  type: ActionTypes.uiSetAppTitle
  payload: string
}

/**
 * Action type for setting screen dimensions.
 */
export type ActionUiSetDimensions = {
  type: ActionTypes.uiSetDimensions
  payload: IScreenDimensions
}

/**
 * Action type to set app in full screen mode.
 */
export type ActionUiSetFullScreen = {
  type: ActionTypes.uiSetFullScreen
  payload: boolean
}

/**
 * Action type to set app sider width.
 */
export type ActionUiSetSiderWidth = {
  type: ActionTypes.uiSetSiderWidth
  payload: number
}

/**
 * Sets App title that can later be used with helmet or as page title.
 */
export const setAppTitle = (title: string) => {
  return (dispatch: Dispatch) => {
    dispatch<ActionUiSetAppTitle>({
      type: ActionTypes.uiSetAppTitle,
      payload: title,
    })
  }
}

/**
 * Sets dimensions from browser 'window' object.
 */
export const setUiDimensions = () => {
  return (dispatch: Dispatch) => {
    dispatch<ActionUiSetDimensions>({
      type: ActionTypes.uiSetDimensions,
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
    dispatch<ActionUiSetFullScreen>({
      type: ActionTypes.uiSetFullScreen,
      payload: fullscreen,
    })
  }
}

/**
 * Sets ui sider width.
 *
 * @param {number} width
 *   The sider width.
 * @param {boolean} saveToLocal
 *   Whether to save sider width to local storage or not.
 */
export const setSiderWidth = (width: number, saveToLocal: boolean = false) => {
  // Save sider width to local storage.
  if (saveToLocal) {
    localStorage.setItem('siderWidth', JSON.stringify(width))
  }
  return (dispatch: Dispatch) => {
    dispatch<ActionUiSetSiderWidth>({
      type: ActionTypes.uiSetSiderWidth,
      payload: width,
    })
  }
}
