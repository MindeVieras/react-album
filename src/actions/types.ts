import {
  ActionClientSetAppTitle,
  ActionClientSetDimensions,
  ActionClientSetFullScreen,
} from './client.actions'
import { IActionAuthSet, IActionAuthClear } from './auth.actions'
import {
  IActionUsersGetListRequest,
  IActionUsersClear,
  IActionUsersGetListSuccess,
  IActionUsersGetListFailure,
} from './users.actions'

export enum ActionTypes {
  clientSetAppTitle,
  clientSetDimensions,
  clientSetFullScreen,

  authSet,
  authClear,

  usersGetListRequest,
  usersGetListSuccess,
  usersGetListFailure,
  usersGetOneRequest,
  usersGetOneSuccess,
  usersGetOneFailure,
  usersCreateSuccess,
  usersDeleteRequest,
  usersDeleteSuccess,
  usersDeleteFailure,
  usersClear,
}

export type Action =
  | ActionClientSetAppTitle
  | ActionClientSetDimensions
  | ActionClientSetFullScreen
  | IActionAuthSet
  | IActionAuthClear
  | IActionUsersGetListRequest
  | IActionUsersGetListSuccess
  | IActionUsersGetListFailure
  | IActionUsersClear
