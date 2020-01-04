import Bowser from 'bowser'

import { ActionTypes, Action } from '../actions'
import { BrowserOrientation, BrowserSize } from '../enums'

const initialState = {
  // It is safe to set initial browser user agent data here.
  browser: Bowser.parse(window.navigator.userAgent),
  dimensions: {
    width: 0,
    height: 0,
    size: BrowserSize.xs,
    orientation: BrowserOrientation.landscape,
  },
}

export const client = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.clientSetDimensions:
      return {
        ...state,
        dimensions: action.payload,
      }

    default:
      return state
  }
}
