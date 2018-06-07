
import { footerConstants } from '../../_constants'

export const footerActions = {
  buttonSet,
  buttonRemove,
  buttonsClear
}

function buttonSet(name, action, type, data = null) {
  let button = {name, action, type, data}
  return { type: footerConstants.BUTTON_SET, button }
}

function buttonRemove(actionType) {
  return { type: footerConstants.BUTTON_REMOVE, actionType }
}

function buttonsClear() {
  return { type: footerConstants.BUTTONS_CLEAR }
}
