import {
  ActionUiSetAppTitle,
  ActionUiSetDimensions,
  ActionUiSetFullScreen,
  ActionUiSetSiderWidth,
} from './ui.actions'
import { ActionAuthSet, ActionAuthClear } from './auth.actions'
import {
  ActionUsersGetListRequest,
  ActionUsersGetListSuccess,
  ActionUsersGetListFailure,
  ActionUsersCreateSuccess,
  ActionUsersDeleteRequest,
  ActionUsersDeleteSuccess,
  ActionUsersDeleteFailure,
  ActionUsersAddListItem,
  ActionUsersClear,
} from './users.actions'
import {
  ActionAlbumsGetListRequest,
  ActionAlbumsGetListSuccess,
  ActionAlbumsGetListFailure,
  ActionAlbumsGetOneRequest,
  ActionAlbumsGetOneSuccess,
  ActionAlbumsGetOneFailure,
  ActionAlbumsSelect,
  ActionAlbumsClear,
} from './albums.actions'
import {
  ActionMediaSubmit,
  ActionMediaRemoveRequest,
  ActionMediaRemoveSuccess,
  ActionMediaRemoveFailure,
  ActionMediaSetProgress,
  ActionMediaCreate,
} from './media.actions'

export enum ActionTypes {
  uiSetAppTitle = '@@album-app/ui/SET_APP_TITLE',
  uiSetDimensions = '@@album-app/ui/SET_DIMENSIONS',
  uiSetFullScreen = '@@album-app/ui/SET_FULL_SCREEN',
  uiSetSiderWidth = '@@album-app/ui/SET_SIDER_WIDTH',

  authSet = '@@album-app/auth/SET',
  authClear = '@@album-app/auth/CLEAR',

  usersGetListRequest = '@@album-app/users/GET_LIST_REQUEST',
  usersGetListSuccess = '@@album-app/users/GET_LIST_SUCCESS',
  usersGetListFailure = '@@album-app/users/GET_LIST_FAILURE',
  usersGetOneRequest = '@@album-app/users/GET_ONE_REQUEST',
  usersGetOneSuccess = '@@album-app/users/GET_ONE_SUCCESS',
  usersGetOneFailure = '@@album-app/users/GET_ONE_FAILURE',
  usersCreateSuccess = '@@album-app/users/CREATE_SUCCESS',
  usersDeleteRequest = '@@album-app/users/DELETE_REQUEST',
  usersDeleteSuccess = '@@album-app/users/DELETE_SUCCESS',
  usersDeleteFailure = '@@album-app/users/DELETE_FAILURE',
  usersAddListItem = '@@album-app/users/ADD_LIST_ITEM',
  usersClear = '@@album-app/users/CLEAR',

  albumsGetListRequest = '@@album-app/albums/GET_LIST_REQUEST',
  albumsGetListSuccess = '@@album-app/albums/GET_LIST_SUCCESS',
  albumsGetListFailure = '@@album-app/albums/GET_LIST_FAILURE',
  albumsGetOneRequest = '@@album-app/albums/GET_ONE_REQUEST',
  albumsGetOneSuccess = '@@album-app/albums/GET_ONE_SUCCESS',
  albumsGetOneFailure = '@@album-app/albums/GET_ONE_FAILURE',
  albumsSelect = '@@album-app/albums/SELECT',
  albumsClear = '@@album-app/albums/CLEAR',

  mediaSubmit = '@@album-app/media/SUBMIT',
  mediaRemoveRequest = '@@album-app/media/REMOVE_REQUEST',
  mediaRemoveSuccess = '@@album-app/media/REMOVE_SUCCESS',
  mediaRemoveFailure = '@@album-app/media/REMOVE_FAILURE',
  mediaSetProgress = '@@album-app/media/SET_PROGRESS',
  mediaCreate = '@@album-app/media/CREATE',
}

export type Action =
  | ActionUiSetAppTitle
  | ActionUiSetDimensions
  | ActionUiSetFullScreen
  | ActionUiSetSiderWidth
  | ActionAuthSet
  | ActionAuthClear
  | ActionUsersGetListRequest
  | ActionUsersGetListSuccess
  | ActionUsersGetListFailure
  | ActionUsersCreateSuccess
  | ActionUsersDeleteRequest
  | ActionUsersDeleteSuccess
  | ActionUsersDeleteFailure
  | ActionUsersAddListItem
  | ActionUsersClear
  | ActionAlbumsGetListRequest
  | ActionAlbumsGetListSuccess
  | ActionAlbumsGetListFailure
  | ActionAlbumsGetOneRequest
  | ActionAlbumsGetOneSuccess
  | ActionAlbumsGetOneFailure
  | ActionAlbumsSelect
  | ActionAlbumsClear
  | ActionMediaSubmit
  | ActionMediaRemoveRequest
  | ActionMediaRemoveSuccess
  | ActionMediaRemoveFailure
  | ActionMediaSetProgress
  | ActionMediaCreate
