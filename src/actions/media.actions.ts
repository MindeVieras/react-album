import { Dispatch } from 'redux'

import { ActionTypes } from './types'
import { IMediaSubmitProps } from '../services'

export interface IActionMediaSubmit {
  type: ActionTypes.mediaSubmit
  payload: IMediaSubmitProps
}

/**
 * Submits media to album on upload.
 *
 * @param {IMediaSubmitProps} data
 *   Uploading media data.
 */
export const mediaSubmit = (data: IMediaSubmitProps) => {
  return (dispatch: Dispatch) => {
    // Dispatch media submit state.
    dispatch<IActionMediaSubmit>({
      type: ActionTypes.mediaSubmit,
      payload: data,
    })
  }
}
