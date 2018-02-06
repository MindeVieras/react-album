
import { userConstants } from '../../_constants'

let user = JSON.parse(localStorage.getItem('user'))
const initialState = user ? { loggedIn: true, user } : {}

export function auth(state = initialState, action) {
  switch (action.type) {
  case userConstants.LOGIN_REQUEST:
    return {
      loading: true
    }
  case userConstants.LOGIN_SUCCESS:
    return {
      loggedIn: true,
      user: action.user
    }
  case userConstants.LOGIN_FAILURE:
    return {
      error: true,
      msg: action.error
    }
  // case userConstants.SET_SETTING_REQUEST:
  //   return {
  //     ...state,
  //     selected_user: {
  //       loading: true
  //     }
  //   }
  case userConstants.SET_SETTING_SUCCESS:
    return {
      ...state,
      user: {
        ...state.user,
        settings: {
          ...state.user.settings,
          [action.name]: action.value
        }
      }
    }
  // case userConstants.SET_SETTING_FAILURE:
  //   return {
  //     selected_user: {
  //       err: action.err
  //     }
  //   }
  case userConstants.LOGOUT:
    return {}
  default:
    return state
  }
}
