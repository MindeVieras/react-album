import { IActionClientSetDimensions } from './client.actions'
import { IActionAuthSet, IActionAuthClear } from './auth.actions'
import {
  IActionUsersGetListRequest,
  IActionUsersClear,
  IActionUsersGetListSuccess,
  IActionUsersGetListFailure,
} from './users.actions'

export enum ActionTypes {
  clientSetDimensions,
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
  | IActionClientSetDimensions
  | IActionAuthSet
  | IActionAuthClear
  | IActionUsersGetListRequest
  | IActionUsersGetListSuccess
  | IActionUsersGetListFailure
  | IActionUsersClear
