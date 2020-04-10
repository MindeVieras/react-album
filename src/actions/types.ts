import {
  ActionUiSetAppTitle,
  ActionUiSetDimensions,
  ActionUiSetFullScreen,
  ActionUiSetSiderWidth,
} from './ui.actions'
import { IActionAuthSet, IActionAuthClear } from './auth.actions'
import {
  IActionUsersGetListRequest,
  IActionUsersGetListSuccess,
  IActionUsersGetListFailure,
  IActionUsersClear,
} from './users.actions'
import {
  IActionAlbumsGetListRequest,
  IActionAlbumsGetListSuccess,
  IActionAlbumsGetListFailure,
  IActionAlbumsGetOneRequest,
  IActionAlbumsGetOneSuccess,
  IActionAlbumsGetOneFailure,
  IActionAlbumsSelect,
  IActionAlbumsClear,
} from './albums.actions'

export enum ActionTypes {
  uiSetAppTitle,
  uiSetDimensions,
  uiSetFullScreen,
  uiSetSiderWidth,

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

  albumsGetListRequest,
  albumsGetListSuccess,
  albumsGetListFailure,
  albumsGetOneRequest,
  albumsGetOneSuccess,
  albumsGetOneFailure,
  albumsSelect,
  albumsClear,
}

export type Action =
  | ActionUiSetAppTitle
  | ActionUiSetDimensions
  | ActionUiSetFullScreen
  | ActionUiSetSiderWidth
  | IActionAuthSet
  | IActionAuthClear
  | IActionUsersGetListRequest
  | IActionUsersGetListSuccess
  | IActionUsersGetListFailure
  | IActionUsersClear
  | IActionAlbumsGetListRequest
  | IActionAlbumsGetListSuccess
  | IActionAlbumsGetListFailure
  | IActionAlbumsGetOneRequest
  | IActionAlbumsGetOneSuccess
  | IActionAlbumsGetOneFailure
  | IActionAlbumsSelect
  | IActionAlbumsClear
