import { ActionTypes, Action } from '../actions'
import { IAuthResponseData } from '../services'

let initialState = {} as IAuthResponseData
/**
 * Set initial auth state if user exists on local storage.
 */
const localUser = localStorage.getItem('user')
if (localUser) {
  initialState = JSON.parse(localUser)
}

export const auth = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.authSet:
      return action.payload

    case ActionTypes.authClear:
      return {}

    default:
      return state
  }
}
