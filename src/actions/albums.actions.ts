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

    // Get response from users service.
    const $albums = new AlbumsService()
    const res = await $albums.getList(params)

    // Dispatch successful response.
    if ($albums.isSuccess && res.data) {
      dispatch<IActionAlbumsGetListSuccess>({
        type: ActionTypes.albumsGetListSuccess,
        payload: res.data,
      })

      // Dispatch unsuccessful response.
    } else if (!$albums.isSuccess && res.message) {
      dispatch<IActionAlbumsGetListFailure>({
        type: ActionTypes.albumsGetListFailure,
        payload: res.message,
      })
    }
  }
}
