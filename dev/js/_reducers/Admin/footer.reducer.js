
import { footerConstants } from '../../_constants'

export function footer(state = [], action) {
  switch (action.type) {
  case footerConstants.BUTTON_SET:
    return {
      buttons: [action.button, ...state.buttons]
    }
  case footerConstants.BUTTON_REMOVE:
    return {
      buttons: state.buttons.filter(btn => btn.action !== action.actionType)
    }
  case footerConstants.BUTTONS_CLEAR:
    return { buttons:[] }
  default:
    return state
  }
}
