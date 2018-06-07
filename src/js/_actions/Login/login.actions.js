
import { userConstants } from '../../_constants'
import { loginService } from '../../_services'
import { history } from '../../_helpers'

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
          if (user.access_level === 'admin') {
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
