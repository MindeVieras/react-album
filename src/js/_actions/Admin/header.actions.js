
import { headerConstants } from 'Constants'

export const headerActions = {
  setTitle
}

function setTitle(title) {
  return { type: headerConstants.SET_TITLE, title }
}
