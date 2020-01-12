import { ActionTypes, Action } from '../actions'
import { IAuthResponseData } from '../services'

let initialState = {} as IAuthResponseData
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
