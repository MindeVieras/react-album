
import { footerConstants } from '../_constants';

export const footerActions = {
    linkAdd,
    linksClear
};

function linkAdd(name, url, id) {
  let links = [];
  let link = {name, url, id};
  links.push(link);
  return { type: footerConstants.LINK_ADD, links };
}

function linksClear() {
    return { type: footerConstants.LINKS_CLEAR };
}
