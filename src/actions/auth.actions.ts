import { Dispatch } from 'redux'

import { ActionTypes } from './types'
import { AuthService, IAuthResponseData } from '../services'
import { IActionAlbumsClear } from './albums.actions'
import { IActionUsersClear } from './users.actions'

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
  AuthService.logout()
  // Clear the state.
  return (dispatch: Dispatch) => {
    dispatch<IActionAuthClear>({
      type: ActionTypes.authClear,
    })
    dispatch<IActionUsersClear>({
      type: ActionTypes.usersClear,
    })
    dispatch<IActionAlbumsClear>({
      type: ActionTypes.albumsClear,
    })
  }
}
