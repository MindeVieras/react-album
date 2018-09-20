
import { userConstants, utilsConstants } from 'Constants'
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

  return dispatch => {
    // Clear sensitive redux state
    dispatch(logout())
    dispatch(clearAdminSettings())
    dispatch(clearUsers())
  }

  function logout() { return { type: userConstants.LOGOUT } }
  function clearAdminSettings() { return { type: utilsConstants.CLEAR_ADMIN_SETTINGS } }
  function clearUsers() { return { type: userConstants.CLEAR } }

}
