import { Dispatch } from 'redux'

import { ActionTypes } from './types'
import { IScreenDimensions, screenDimensions } from '../helpers'

export interface IActionClientSetDimensions {
  type: ActionTypes.clientSetDimensions
  payload: IScreenDimensions
}

/**
 * Sets dimensions from browser 'window' object.
 */
export const setClientDimensions = () => {
  return (dispatch: Dispatch) => {
    dispatch<IActionClientSetDimensions>({
      type: ActionTypes.clientSetDimensions,
      payload: screenDimensions(),
    })
  }
}
