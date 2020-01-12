import { Dispatch } from 'redux'

import { ActionTypes } from './types'
import { authService, IAuthResponseData } from '../services'

export interface IActionAuthSet {
  type: ActionTypes.authSet
  payload: IAuthResponseData
}

export interface IActionAuthClear {
  type: ActionTypes.authClear
}

/**
 * Authentication action to set logged in user to the state.
 *
 * @param {IAuthResponseData} auth
 *   User authentication response data.
 */
export const authSet = (auth: IAuthResponseData) => {
  return (dispatch: Dispatch) => {
    dispatch<IActionAuthSet>({
      type: ActionTypes.authSet,
      payload: auth,
    })
  }
}

export const authClear = () => {
  // Call logout service to clear local storage.
  authService.logout()
  return (dispatch: Dispatch) => {
    dispatch<IActionAuthClear>({
      type: ActionTypes.authClear,
    })
    // dispatch<IActionAuthClear>({
    //   type: ActionTypes.authClear,
    // })
  }
}
