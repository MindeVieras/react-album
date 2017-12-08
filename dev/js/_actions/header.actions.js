
import { headerConstants } from '../_constants';

export const headerActions = {
  setTitle
};

function setTitle(title) {
  return { type: headerConstants.SET_TITLE, title };
}
