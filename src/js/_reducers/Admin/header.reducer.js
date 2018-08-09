
import { headerConstants } from 'Constants'

export function header(state = { title: '' }, action) {
  switch (action.type) {
  case headerConstants.SET_TITLE:
    return {
      title: action.title
    }
  default:
    return state
  }
}
