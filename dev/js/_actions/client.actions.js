
import { clientConstants } from '../_constants'

export const clientActions = {
  setBrowser
}

function setBrowser(browser) {

  return dispatch => {
    dispatch(set(browser))
  }

  function set(browser) { return { type: clientConstants.SET_BROWSER, browser } }
}
