import { Dispatch } from 'redux'

import { ActionTypes } from './types'
import { AuthService, IAuthResponseData } from '../services'
import { ActionAlbumsClear } from './albums.actions'
import { ActionUsersClear } from './users.actions'

export type ActionAuthSet = {
  type: ActionTypes.authSet
  payload: IAuthResponseData
}

export type ActionAuthClear = {
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
    dispatch<ActionAuthSet>({
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
    dispatch<ActionAuthClear>({
      type: ActionTypes.authClear,
    })
    dispatch<ActionUsersClear>({
      type: ActionTypes.usersClear,
    })
    dispatch<ActionAlbumsClear>({
      type: ActionTypes.albumsClear,
    })
  }
}
