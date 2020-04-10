import { Dispatch } from 'redux'

import { ActionTypes } from './types'
import { IResponsePaginatedData, IRequestGetListParams, IUserProps } from '../services'
import { UsersService } from '../services'

export interface IActionUsersGetListRequest {
  type: ActionTypes.usersGetListRequest
}

export interface IActionUsersGetListSuccess {
  type: ActionTypes.usersGetListSuccess
  payload: IResponsePaginatedData<IUserProps>
}

export interface IActionUsersGetListFailure {
  type: ActionTypes.usersGetListFailure
  payload: string
}

export interface IActionUsersClear {
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
    dispatch<IActionUsersGetListRequest>({
      type: ActionTypes.usersGetListRequest,
    })

    // Get response from users service.
    const $users = new UsersService()
    const { data, message } = await $users.getList(params)

    // Dispatch successful response.
    if ($users.isSuccess && data) {
      dispatch<IActionUsersGetListSuccess>({
        type: ActionTypes.usersGetListSuccess,
        payload: data,
      })

      // Dispatch unsuccessful response.
    } else if (!$users.isSuccess && message) {
      dispatch<IActionUsersGetListFailure>({
        type: ActionTypes.usersGetListFailure,
        payload: message,
      })
    }
  }
}

// function create(user) {
//   return dispatch => {
//     dispatch(success(user))
//   }

//   function success(user) { return { type: userConstants.CREATE_SUCCESS, user } }
// }

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

// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//   return dispatch => {
//     dispatch(request(id))

//     userService.delete(id)
//       .then(res => {
//         if (res.ack == 'ok') {
//           dispatch(success(id))
//         } else {
//           dispatch(failure(id, res.msg))
//           toastr.error('Error', res.msg, { timeOut: 3000 })
//         }
//       })
//   }

//   function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
//   function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
//   function failure(id, err) { return { type: userConstants.DELETE_FAILURE, id, err } }
// }
