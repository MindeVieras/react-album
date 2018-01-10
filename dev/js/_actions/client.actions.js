
import { clientConstants } from '../_constants'

export const clientActions = {
  setBrowser,
  setScreen
}

function setBrowser(browser) {

  return dispatch => {
    dispatch(set(browser))
  }

  function set(browser) { return { type: clientConstants.SET_BROWSER, browser } }
}

function setScreen(screen) {

  return dispatch => {
    dispatch(set(screen))
  }

  function set(screen) { return { type: clientConstants.SET_SCREEN, screen } }
}
