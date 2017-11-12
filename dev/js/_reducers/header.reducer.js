import { headerConstants } from '../_constants';

export function header(state = {}, action) {
  switch (action.type) {
    case headerConstants.TITLE_CHANGE:
      return {
        title: action.title
      };
    default:
      return state
  }
}