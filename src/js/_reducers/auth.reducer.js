
import { userConstants } from 'Constants'

let user = JSON.parse(localStorage.getItem('user'))
const initialState = user || {}

export function auth(state = initialState, action) {
  switch (action.type) {

  case userConstants.LOGIN:
    return action.user

  case userConstants.LOGOUT:
    return {}

  default:
    return state
  }
}
