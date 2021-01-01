import { Dispatch } from 'redux'

import { ActionTypes } from './types'
import { IResponsePaginatedData, IRequestGetListParams, IAlbumProps } from '../services'
import { AlbumsService } from '../services'

export type ActionAlbumsGetListRequest = {
  type: ActionTypes.albumsGetListRequest
}

export type ActionAlbumsGetListSuccess = {
  type: ActionTypes.albumsGetListSuccess
  payload: IResponsePaginatedData<IAlbumProps>
}

export type ActionAlbumsGetListFailure = {
  type: ActionTypes.albumsGetListFailure
  payload: string
}

export type ActionAlbumsGetOneRequest = {
  type: ActionTypes.albumsGetOneRequest
  payload: string
}

export type ActionAlbumsGetOneSuccess = {
  type: ActionTypes.albumsGetOneSuccess
  payload: {
    id: string
    data: IAlbumProps
  }
}

export type ActionAlbumsGetOneFailure = {
  type: ActionTypes.albumsGetOneFailure
  payload: {
    id: string
    message: string
  }
}

export type ActionAlbumsSelect = {
  type: ActionTypes.albumsSelect
  payload: string
}

export type ActionAlbumsClear = {
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
    dispatch<ActionAlbumsGetListRequest>({
      type: ActionTypes.albumsGetListRequest,
    })

    // Get response from albums service.
    const $albums = new AlbumsService()
    const { data, message } = await $albums.getList(params)

    // Dispatch successful response.
    if ($albums.isSuccess && data) {
      dispatch<ActionAlbumsGetListSuccess>({
        type: ActionTypes.albumsGetListSuccess,
        payload: data,
      })

      // Dispatch unsuccessful response.
    } else if (!$albums.isSuccess && message) {
      dispatch<ActionAlbumsGetListFailure>({
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
    dispatch<ActionAlbumsSelect>({
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
    dispatch<ActionAlbumsGetOneRequest>({
      type: ActionTypes.albumsGetOneRequest,
      payload: id,
    })

    // Get response from albums service.
    const $albums = new AlbumsService()
    const { data, message } = await $albums.getOne(id)

    // Dispatch successful response.
    if ($albums.isSuccess && data) {
      dispatch<ActionAlbumsGetOneSuccess>({
        type: ActionTypes.albumsGetOneSuccess,
        payload: { id, data },
      })

      // Dispatch unsuccessful response.
    } else if (!$albums.isSuccess && message) {
      dispatch<ActionAlbumsGetOneFailure>({
        type: ActionTypes.albumsGetOneFailure,
        payload: { id, message },
      })
    }
  }
}
