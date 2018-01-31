
import { clientConstants } from '../_constants'
import { locationService } from '../_services'

export const clientActions = {
  setBrowser,
  setScreen,
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

function setCurrentLocation() {

  return dispatch => {

    locationService.getCurrentLocation(function(err, pos){
      dispatch(set(pos))
    })
  }

  function set(location) { return { type: clientConstants.SET_CURRENT_LOCATION, location } }
}
