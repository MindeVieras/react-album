
import { clientConstants } from 'Constants'
import { locationService } from 'Services'

export const clientActions = {
  setBrowser,
  setScreen,
  setFullScreen,
  setCurrentLocation
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

function setFullScreen(full_screen) {

  return dispatch => {
    dispatch(set(full_screen))
  }

  function set(full_screen) { return { type: clientConstants.SET_FULLSCREEN, full_screen } }
}

function setCurrentLocation() {

  return dispatch => {

    locationService.getCurrentLocation(pos => {
      dispatch(set(pos))
    })
  }

  function set(location) { return { type: clientConstants.SET_CURRENT_LOCATION, location } }
}
