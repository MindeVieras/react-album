
import { userConstants } from 'Constants'
import { loginService } from 'Services'

export const loginActions = {
  login,
  logout
}

function login(user) {
  return dispatch => {
    dispatch(success(user))
  }

  function success(user) { return { type: userConstants.LOGIN, user } }
}

function logout() {
  loginService.logout()
  return { type: userConstants.LOGOUT }
}
