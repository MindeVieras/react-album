
import { clientConstants } from 'Constants'

const initialState = {
  full_screen: false
}

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
  case clientConstants.SET_FULLSCREEN:
    return {
      ...state,
      full_screen: action.full_screen
    }
  case clientConstants.SET_CURRENT_LOCATION:
    return {
      ...state,
      location: action.location
    }
  default:
    return state
  }
}
