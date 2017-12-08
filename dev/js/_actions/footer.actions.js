
import { footerConstants } from '../_constants';

export const footerActions = {
  buttonSet,
  buttonsClear
};

function buttonSet(name, action, type) {
  let button = {name, action, type};
  return { type: footerConstants.BUTTON_SET, button };
}

function buttonsClear() {
  return { type: footerConstants.BUTTONS_CLEAR };
}
