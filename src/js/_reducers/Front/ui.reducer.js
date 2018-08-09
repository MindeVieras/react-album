
import { frontConstants } from 'Constants'

const initialState = {
  menu_open: false
}

export function frontUi(state = initialState, action) {
  switch (action.type) {
  case frontConstants.UI_MENU_OPEN:
    return {
      ...state,
      menu_open: action.menu_open
    }
  default:
    return state
  }
}
