
import { userConstants } from 'Constants'
import { loginService } from 'Services'
import { history } from 'Helpers'

export const loginActions = {
  login,
  logout
}

function login(username, password) {
  return dispatch => {
    dispatch(request())

    loginService.login(username, password)
      .then(res => {
        if (res.ack == 'ok') {
          const user = res.data
          dispatch(success(user))
          if (user.access_level >= userConstants.USER_ACCESS_AUTHED) {
            history.push('/admin')
          } else {
            history.push('/')
          }
        } else {
          dispatch(failure(res.msg))
        }
      })
  }

  function request() { return { type: userConstants.LOGIN_REQUEST } }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
  loginService.logout()
  return { type: userConstants.LOGOUT }
}
