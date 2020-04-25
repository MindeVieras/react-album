import { Dispatch } from 'redux'

import { ActionTypes } from './types'
import { IResponsePaginatedData, IRequestGetListParams, IAlbumProps } from '../services'
import { AlbumsService } from '../services'

export interface IActionAlbumsGetListRequest {
  type: ActionTypes.albumsGetListRequest
}

export interface IActionAlbumsGetListSuccess {
  type: ActionTypes.albumsGetListSuccess
  payload: IResponsePaginatedData<IAlbumProps>
}

export interface IActionAlbumsGetListFailure {
  type: ActionTypes.albumsGetListFailure
  payload: string
}

export interface IActionAlbumsGetOneRequest {
  type: ActionTypes.albumsGetOneRequest
  payload: string
}

export interface IActionAlbumsGetOneSuccess {
  type: ActionTypes.albumsGetOneSuccess
  payload: {
    id: string
    data: IAlbumProps
  }
}

export interface IActionAlbumsGetOneFailure {
  type: ActionTypes.albumsGetOneFailure
  payload: {
    id: string
    message: string
  }
}

export interface IActionAlbumsSelect {
  type: ActionTypes.albumsSelect
  payload: string
}

export interface IActionAlbumsClear {
  type: ActionTypes.albumsClear
}

/**
 * Get list of albums action.
 *
 * @param {IRequestGetListParams} params
 *   Query parameters to pass 'limit', 'page' or 'sort'.
 */
export const albumsGetList = (params?: IRequestGetListParams) => {
  return async (dispatch: Dispatch) => {
    // Dispatch loading state.
    dispatch<IActionAlbumsGetListRequest>({
      type: ActionTypes.albumsGetListRequest,
    })

    // Get response from albums service.
    const $albums = new AlbumsService()
    const { data, message } = await $albums.getList(params)

    // Dispatch successful response.
    if ($albums.isSuccess && data) {
      dispatch<IActionAlbumsGetListSuccess>({
        type: ActionTypes.albumsGetListSuccess,
        payload: data,
      })

      // Dispatch unsuccessful response.
    } else if (!$albums.isSuccess && message) {
      dispatch<IActionAlbumsGetListFailure>({
        type: ActionTypes.albumsGetListFailure,
        payload: message,
      })
    }
  }
}

/**
 * Selects an album.
 *
 * @param {string} id
 *   Album document ID.
 */
export const albumsSelect = (id: string) => {
  // Save selected album id to local storage.
  localStorage.setItem('selectedAlbum', JSON.stringify(id))

  return (dispatch: Dispatch) => {
    // Dispatch album select state.
    dispatch<IActionAlbumsSelect>({
      type: ActionTypes.albumsSelect,
      payload: id,
    })
  }
}

/**
 * Get one album action.
 *
 * @param {string} id
 *   Album document ID.
 */
export const albumsGetOne = (id: string) => {
  return async (dispatch: Dispatch) => {
    // Dispatch loading state.
    dispatch<IActionAlbumsGetOneRequest>({
      type: ActionTypes.albumsGetOneRequest,
      payload: id,
    })

    // Get response from albums service.
    const $albums = new AlbumsService()
    const { data, message } = await $albums.getOne(id)

    // Dispatch successful response.
    if ($albums.isSuccess && data) {
      dispatch<IActionAlbumsGetOneSuccess>({
        type: ActionTypes.albumsGetOneSuccess,
        payload: { id, data },
      })

      // Dispatch unsuccessful response.
    } else if (!$albums.isSuccess && message) {
      dispatch<IActionAlbumsGetOneFailure>({
        type: ActionTypes.albumsGetOneFailure,
        payload: { id, message },
      })
    }
  }
}
