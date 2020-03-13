import Bowser from 'bowser'

import { ActionTypes, Action } from '../actions'
import { BrowserOrientation, BrowserSize } from '../enums'

const initialState = {
  appName: 'Album APP',
  appDescription: 'Media Album APP',
  // It is safe to set initial browser user agent data here.
  browser: Bowser.parse(window.navigator.userAgent),
  dimensions: {
    width: 0,
    height: 0,
    size: BrowserSize.xs,
    orientation: BrowserOrientation.landscape,
  },
  fullScreen: false,
}

export const client = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.clientSetAppTitle:
      return {
        ...state,
        appTitle: action.payload,
      }

    case ActionTypes.clientSetDimensions:
      return {
        ...state,
        dimensions: action.payload,
      }

    case ActionTypes.clientSetFullScreen:
      return {
        ...state,
        fullScreen: action.payload,
      }

    default:
      return state
  }
}
