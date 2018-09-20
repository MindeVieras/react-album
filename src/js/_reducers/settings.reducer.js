
import { utilsConstants } from 'Constants'

const initialState = {}

export function settings(state = initialState, action) {
  switch (action.type) {
  case utilsConstants.GET_APP_SETTINGS:
    return {
      ...state,
      app: action.settings
    }
  case utilsConstants.GET_ADMIN_SETTINGS:
    return {
      ...state,
      admin: action.settings
    }
  // case userConstants.SET_SETTING_REQUEST:
  //   return {
  //     ...state,
  //     selected_user: {
  //       loading: true
  //     }
  //   }
  case utilsConstants.SET_ADMIN_SETTING_SUCCESS:
    return {
      ...state,
      admin: {
        ...state.admin,
        [action.name]: action.value
      }
    }
  // case userConstants.SET_SETTING_FAILURE:
  //   return {
  //     selected_user: {
  //       err: action.err
  //     }
  //   }

  case utilsConstants.CLEAR_ADMIN_SETTINGS:
    const { admin, ...stateCopy } = state
    return {
      ...stateCopy
    }
  case utilsConstants.GET_FRONT_SETTINGS:
    return {
      ...state,
      front: action.settings
    }
  // case userConstants.SET_SETTING_REQUEST:
  //   return {
  //     ...state,
  //     selected_user: {
  //       loading: true
  //     }
  //   }
  case utilsConstants.SET_FRONT_SETTING_SUCCESS:
    return {
      ...state,
      front: {
        ...state.front,
        [action.name]: action.value
      }
    }
  // case userConstants.SET_SETTING_FAILURE:
  //   return {
  //     selected_user: {
  //       err: action.err
  //     }
  //   }
  default:
    return state
  }
}
