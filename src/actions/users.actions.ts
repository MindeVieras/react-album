import { Dispatch } from 'redux'

import { store } from '../helpers'
import { ActionTypes } from './types'
import { IResponsePaginatedData, IRequestGetListParams, IUserProps } from '../services'
import { UsersService } from '../services'

export type ActionUsersGetListRequest = {
  type: ActionTypes.usersGetListRequest
}

export type ActionUsersGetListSuccess = {
  type: ActionTypes.usersGetListSuccess
  payload: IResponsePaginatedData<IUserProps>
}

export type ActionUsersGetListFailure = {
  type: ActionTypes.usersGetListFailure
  payload: string
}

export type ActionUsersCreateSuccess = {
  type: ActionTypes.usersCreateSuccess
  payload: IUserProps
}

export type ActionUsersDeleteRequest = {
  type: ActionTypes.usersDeleteRequest
  payload: IUserProps['id'][]
}

export type ActionUsersDeleteSuccess = {
  type: ActionTypes.usersDeleteSuccess
  payload: IUserProps['id'][]
}

export type ActionUsersDeleteFailure = {
  type: ActionTypes.usersDeleteFailure
  payload: IUserProps['id'][]
}

export type ActionUsersAddListItem = {
  type: ActionTypes.usersAddListItem
  payload: IUserProps
}

export type ActionUsersClear = {
  type: ActionTypes.usersClear
}

/**
 * Get list of users action.
 *
 * @param {IRequestGetListParams} params
 *   Query parameters to pass 'limit', 'page' or 'sort'.
 */
export const usersGetList = (params?: IRequestGetListParams) => {
  return async (dispatch: Dispatch) => {
    // Dispatch loading state.
    dispatch<ActionUsersGetListRequest>({
      type: ActionTypes.usersGetListRequest,
    })

    // Get response from users service.
    const $users = new UsersService()
    const { data, message } = await $users.getList({ ...params, sort: '-createdAt' })

    // Dispatch successful response.
    if ($users.isSuccess && data) {
      dispatch<ActionUsersGetListSuccess>({
        type: ActionTypes.usersGetListSuccess,
        payload: data,
      })

      // Dispatch unsuccessful response.
    } else if (!$users.isSuccess && message) {
      dispatch<ActionUsersGetListFailure>({
        type: ActionTypes.usersGetListFailure,
        payload: message,
      })
    }
  }
}

/**
 * Create user action.
 *
 * @param {IUserProps} user
 *   User to add to the state.
 */
export const userCreate = (user: IUserProps) => {
  return (dispatch: Dispatch) => {
    dispatch<ActionUsersCreateSuccess>({
      type: ActionTypes.usersCreateSuccess,
      payload: user,
    })
  }
}

/**
 * Users delete action.
 *
 * @param {IUserProps['id'][]} ids
 *   Array of user ids.
 */
export const usersDelete = (ids: IUserProps['id'][]) => {
  return async (dispatch: Dispatch) => {
    // Dispatch loading state.
    dispatch<ActionUsersDeleteRequest>({
      type: ActionTypes.usersDeleteRequest,
      payload: ids
    })

    // Get response from users service.
    const $users = new UsersService()
    await $users.remove(ids)

    // Dispatch unsuccessful response.
    if (!$users.isSuccess) {
      dispatch<ActionUsersDeleteFailure>({
        type: ActionTypes.usersDeleteFailure,
        payload: ids,
      })
    }
    // Dispatch successful response.
    else {
      const pager = store.getState().users.list.pager
      const nextUserData = await $users.getList({
        limit: 1,
        offset: (pager.limit + pager.offset) - 1,
        sort: '-createdAt',
      })
      const nextUser = nextUserData.data?.docs[0]
      if (nextUser) {
        dispatch<ActionUsersAddListItem>({
          type: ActionTypes.usersAddListItem,
          payload: nextUser,
        })
      }
      dispatch<ActionUsersDeleteSuccess>({
        type: ActionTypes.usersDeleteSuccess,
        payload: ids,
      })
    }

  }
}

// function getOne(username) {
//   return dispatch => {
//     dispatch(request())

//     userService.getOne(username)
//       .then(res => {
//         if (res.ack == 'ok') {
//           dispatch(success(res.data))
//         } else {
//           dispatch(failure(res.msg))
//         }
//       })
//   }

//   function request() { return { type: userConstants.GETONE_REQUEST } }
//   function success(user) { return { type: userConstants.GETONE_SUCCESS, user } }
//   function failure(err) { return { type: userConstants.GETONE_FAILURE, err } }
// }

