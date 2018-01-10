
import { clientConstants } from '../_constants'

const initialState = {}

export function client(state = initialState, action) {
  switch (action.type) {
  case clientConstants.SET_BROWSER:
    return {
      ...state,
      browser: action.browser
    }
  case clientConstants.SET_SCREEN:
    return {
      ...state,
      screen: action.screen
    }
  default:
    return state
  }
}
