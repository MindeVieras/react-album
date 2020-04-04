import Bowser from 'bowser'

import { ActionTypes, Action } from '../actions'
import { UiBrowserOrientation, UiBrowserSize } from '../enums'

const initialState = {
  appName: 'Album APP',
  appDescription: 'Media Album APP',
  // It is safe to set initial browser user agent data here.
  browser: Bowser.parse(window.navigator.userAgent),
  dimensions: {
    width: 0,
    height: 0,
    size: UiBrowserSize.xs,
    orientation: UiBrowserOrientation.landscape,
  },
  fullScreen: false,
  siderWidth: 200,
}

/**
 * Set initial sider width from local storage if available.
 */
const localSiderWidth = localStorage.getItem('siderWidth')
if (localSiderWidth) {
  initialState.siderWidth = JSON.parse(localSiderWidth)
}

export const ui = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.uiSetAppTitle:
      return {
        ...state,
        appTitle: action.payload,
      }

    case ActionTypes.uiSetDimensions:
      return {
        ...state,
        dimensions: action.payload,
      }

    case ActionTypes.uiSetFullScreen:
      return {
        ...state,
        fullScreen: action.payload,
      }

    case ActionTypes.uiSetSiderWidth:
      return {
        ...state,
        siderWidth: action.payload,
      }

    default:
      return state
  }
}
