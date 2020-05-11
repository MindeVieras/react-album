import { Dispatch } from 'redux'

import { ActionTypes } from './types'
import {
  IMediaSubmitProps,
  MediaItem,
  IMediaProps,
  MediaService,
  IMediaCreateValues,
} from '../services'

export interface IActionMediaSubmit {
  type: ActionTypes.mediaSubmit
  payload: IMediaSubmitProps
}

export interface IActionMediaRemoveRequest {
  type: ActionTypes.mediaRemoveRequest
  payload: IMediaProps['id']
}
export interface IActionMediaRemoveSuccess {
  type: ActionTypes.mediaRemoveSuccess
  payload: MediaItem['id']
}
export interface IActionMediaRemoveFailure {
  type: ActionTypes.mediaRemoveFailure
  payload: {
    id: IMediaProps['id']
    message: string
  }
}

export interface IActionMediaSetProgress {
  type: ActionTypes.mediaSetProgress
  payload: {
    id: MediaItem['id']
    progress: number
  }
}
export interface IActionMediaCreate {
  type: ActionTypes.mediaCreate
  payload: {
    id: IMediaSubmitProps['id']
    item: IMediaProps
  }
}

/**
 * Submits media to album on upload.
 *
 * @param {IMediaSubmitProps} data
 *   Uploading media data.
 */
export const mediaSubmit = (data: IMediaSubmitProps) => {
  return (dispatch: Dispatch) => {
    // Set media album id.
    window.uploader.setFileMeta(data.id, { album: data.album })

    // Dispatch media submit state.
    dispatch<IActionMediaSubmit>({
      type: ActionTypes.mediaSubmit,
      payload: data,
    })
  }
}

/**
 * Removes media from uploader and redux state.
 *
 * @param {MediaItem['id']} id
 *   Media item id.
 * @param {boolean} isUppy
 *   Optional flag to determine uploader file to remove.
 */
export const mediaRemove = (id: MediaItem['id'], isUppy?: boolean) => {
  return async (dispatch: Dispatch) => {
    // For uUppy uploads just remove item from the state.
    if (isUppy) {
      // Dispatch media remove state.
      dispatch<IActionMediaRemoveSuccess>({
        type: ActionTypes.mediaRemoveSuccess,
        payload: id,
      })
      // For media already saved on the server - use media service to trash media item.
    } else {
      // Dispatch loading state.
      dispatch<IActionMediaRemoveRequest>({
        type: ActionTypes.mediaRemoveRequest,
        payload: id,
      })

      // Get response from media service.
      const $media = new MediaService()
      const { data, message } = await $media.trash(id)

      // Dispatch successful response.
      if ($media.isSuccess && data) {
        dispatch<IActionMediaRemoveSuccess>({
          type: ActionTypes.mediaRemoveSuccess,
          payload: id,
        })

        // Dispatch unsuccessful response.
      } else if (!$media.isSuccess && message) {
        dispatch<IActionMediaRemoveFailure>({
          type: ActionTypes.mediaRemoveFailure,
          payload: { id, message },
        })
      }
    }
  }
}

/**
 * Sets progress to the media item.
 *
 * @param {MediaItem['id']} id
 *   Media item id.
 * @param {number} progress
 *   Progress to set in percentages.
 */
export const mediaSetProgress = (id: MediaItem['id'], progress: number) => {
  return (dispatch: Dispatch) => {
    // Dispatch media progress state.
    dispatch<IActionMediaSetProgress>({
      type: ActionTypes.mediaSetProgress,
      payload: { id, progress },
    })
  }
}

/**
 * Creates media item from server response.
 *
 * @param {IMediaSubmitProps['id']} id
 *   Media id from uploader.
 * @param {IMediaCreateValues} values
 *   Media create values.
 */
export const mediaCreate = (id: IMediaSubmitProps['id'], values: IMediaCreateValues) => {
  return async (dispatch: Dispatch) => {
    // Get response from media service.
    const $media = new MediaService()
    const { data } = await $media.create(values)

    // Dispatch successful response.
    if ($media.isSuccess && data) {
      dispatch<IActionMediaCreate>({
        type: ActionTypes.mediaCreate,
        payload: {
          id,
          item: data,
        },
      })
    }
  }
}
