
import { frontConstants } from 'Constants'

export const frontUiActions = {
  menuOpen
}

function menuOpen(menu_open) {
  return dispatch => {
    dispatch(open(menu_open))
  }

  function open(menu_open) { return { type: frontConstants.UI_MENU_OPEN, menu_open } }
}
