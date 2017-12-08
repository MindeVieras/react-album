
import { headerConstants } from '../_constants'

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
