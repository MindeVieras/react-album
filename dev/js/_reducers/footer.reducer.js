
import { footerConstants } from '../_constants';

export function footer(state = {}, action) {
  switch (action.type) {
    case footerConstants.LINK_ADD:
      return {
        links: action.links
      };
    case footerConstants.LINKS_CLEAR:
      return {links:[]};
    default:
      return state
  }
}