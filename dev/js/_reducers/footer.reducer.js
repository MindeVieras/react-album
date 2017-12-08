
import { footerConstants } from '../_constants';

export function footer(state = [], action) {
  switch (action.type) {
  case footerConstants.BUTTON_SET:
    return {
      buttons: [...state.buttons, action.button]
    };
  case footerConstants.BUTTONS_CLEAR:
    return {buttons:[]};
  default:
    return state
  }
}