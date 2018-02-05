
export const albumsConstants = {
  
  DISABLED: 0,
  ENABLED: 1,
  TRASHED: 2,

  PRIVATE: 0,
  PUBLIC: 1,

  GETONE_REQUEST: 'ALBUM_GETONE_REQUEST',
  GETONE_SUCCESS: 'ALBUM_GETONE_SUCCESS',
  GETONE_FAILURE: 'ALBUM_GETONE_FAILURE',

  GETLOCATIONS_REQUEST: 'ALBUM_GETLOCATIONS_REQUEST',
  GETLOCATIONS_SUCCESS: 'ALBUM_GETLOCATIONS_SUCCESS',
  GETLOCATIONS_FAILURE: 'ALBUM_GETLOCATIONS_FAILURE',
  REMOVE_LOCATION: 'ALBUM_REMOVE_LOCATION',
  SET_LOCATION: 'ALBUM_SET_LOCATION',
  
  ADD_TO_LIST: 'ALBUM_ADD_TO_LIST',
  RENAME: 'ALBUM_RENAME',
  CHANGE_DATE: 'ALBUM_CHANGE_DATETIME',

  GETLIST_REQUEST: 'ALBUMS_GETLIST_REQUEST',
  GETLIST_SUCCESS: 'ALBUMS_GETLIST_SUCCESS',
  GETLIST_FAILURE: 'ALBUMS_GETLIST_FAILURE',

  DELETE_REQUEST: 'ALBUM_DELETE_REQUEST',
  DELETE_SUCCESS: 'ALBUM_DELETE_SUCCESS',
  DELETE_FAILURE: 'ALBUM_DELETE_FAILURE'
}
