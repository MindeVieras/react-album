
import {toastr} from 'react-redux-toastr'
import Popup from 'react-popup'

import { albumsConstants } from '../../_constants'
import { albumsService, mediaService } from '../../_services'

export const albumsActions = {
  getList, getListDates, addToList,
  getOne,
  rename, changeDate,
  clearSelected,
  removeLocation,
  setLocation,
  updateLocation,
  setMediaLocation,
  updateMediaLocation,
  removeMediaLocation,
  openMediaLocationMarker,
  closeMediaLocationMarkers,
  setMapEdit,
  setMapCenter,
  setMapZoom,
  moveMedia,
  delete: _delete
}


/*
 * Album list actions
 * calls getList, getListDates, addToList
 */

function getList(start_date, end_date) {
  return dispatch => {
    dispatch(request())

    albumsService.getList(start_date, end_date)
      .then(function(res) {
        if (res.ack == 'ok') {
          dispatch(success(res.list))
        } else {
          dispatch(failure(res.msg))
        }
      })
  }

  function request() { return { type: albumsConstants.GET_LIST_REQUEST } }
  function success(albums) { return { type: albumsConstants.GET_LIST_SUCCESS, albums } }
  function failure(err) { return { type: albumsConstants.GET_LIST_FAILURE, err } }
}
function getListDates() {
  return dispatch => {
    dispatch(request())

    albumsService.getListDates()
      .then(function(res) {
        if (res.ack == 'ok') {
          dispatch(success(res.dates))
        } else {
          dispatch(failure(res.msg))
        }
      })
  }

  function request() { return { type: albumsConstants.GET_LIST_DATES_REQUEST } }
  function success(dates) { return { type: albumsConstants.GET_LIST_DATES_SUCCESS, dates } }
  function failure(err) { return { type: albumsConstants.GET_LIST_DATES_FAILURE, err } }
}
function addToList(album) {
  return dispatch => {
    dispatch(add(album))
  }

  function add(album) { return { type: albumsConstants.ADD_TO_LIST, album } }
}


/*
 * Album list actions
 * calls getOne
 */

function getOne(id) {
  return dispatch => {
    dispatch(request())

    albumsService.getOne(id)
      .then(function(res) {
        if (res.ack == 'ok') {
          dispatch(success(res.data))
        } else {
          dispatch(failure(res.msg))
        }
      })
  }

  function request() { return { type: albumsConstants.GET_ONE_REQUEST } }
  function success(album) { return { type: albumsConstants.GET_ONE_SUCCESS, album } }
  function failure(err) { return { type: albumsConstants.GET_ONE_FAILURE, err } }
}


/*
 * Album data actions
 * calls rename, changeDate
 */

function rename(payload) {
  return dispatch => {
    albumsService.rename(payload)
      .then(function(res) {
        if (res.ack == 'ok') {
          dispatch(rename(payload))
          Popup.close()
          toastr.success('Success', res.msg)
        } else {
          toastr.error('Error', res.msg)
        }
      })
  }

  function rename(payload) { return { type: albumsConstants.RENAME, payload } }
}
function changeDate(payload) {
  return dispatch => {
    albumsService.changeDate(payload)
      .then(function(res) {
        if (res.ack == 'ok') {
          dispatch(change(payload))
          Popup.close()
          toastr.success('Success', res.msg)
        } else {
          toastr.error('Error', res.msg)
        }
      })
  }
  
  function change(payload) { return { type: albumsConstants.CHANGE_DATE, payload } }
}



function clearSelected() {
  return dispatch => {
    dispatch(clear())
  }

  function clear() { return { type: albumsConstants.CLEAR_SELECTED } }
}

function removeLocation(id) {
  return dispatch => {
    albumsService.removeLocation(id)
      .then(function(res) {
        dispatch(remove(id))
      })
  }
  function remove(id) { return { type: albumsConstants.REMOVE_LOCATION, id } }
}

function setLocation(album_id, location) {
  return dispatch => {
    albumsService.setLocation(album_id, location)
      .then(function(res) {
        dispatch(set(location))
      })
  }
  function set(location) { return { type: albumsConstants.SET_LOCATION, location } }
}

function updateLocation(album_id, location) {
  return dispatch => {
    albumsService.updateLocation(album_id, location)
      .then(function(res) {
        dispatch(set(location))
      })
  }
  function set(location) { return { type: albumsConstants.SET_LOCATION, location } }
}

function setMediaLocation(media_id, location) {
  return dispatch => {
    mediaService.setLocation(media_id, location)
      .then(function(res) {
        dispatch(set(media_id, location))
      })
  }
  function set(media_id, location) { return { type: albumsConstants.SET_MEDIA_LOCATION, media_id, location } }
}

function updateMediaLocation(media_id, location) {
  return dispatch => {
    mediaService.updateLocation(media_id, location)
      .then(function(res) {
        dispatch(set(media_id, location))
      })
  }
  function set(media_id, location) { return { type: albumsConstants.SET_MEDIA_LOCATION, media_id, location } }
}

function removeMediaLocation(media_id) {
  return dispatch => {
    mediaService.removeLocation(media_id)
      .then(function(res) {
        dispatch(remove(media_id))
      })
  }
  function remove(media_id) { return { type: albumsConstants.REMOVE_MEDIA_LOCATION, media_id } }
}

function setMapEdit(edit) {
  return dispatch => {
    dispatch(set(edit))
  }

  function set(edit) { return { type: albumsConstants.SET_LOCATIONS_MAP_EDIT, edit } }
}

function setMapCenter(center) {
  return dispatch => {
    dispatch(set(center))
  }

  function set(center) { return { type: albumsConstants.SET_LOCATIONS_MAP_CENTER, center } }
}

function setMapZoom(zoom) {
  return dispatch => {
    dispatch(set(zoom))
  }

  function set(zoom) { return { type: albumsConstants.SET_LOCATIONS_MAP_ZOOM, zoom } }
}

function openMediaLocationMarker(media_id, marker_open) {
  return dispatch => {
    dispatch(open(media_id, marker_open))
  }

  function open(media_id, marker_open) { return { type: albumsConstants.OPEN_MEDIA_LOCATION_MARKER, media_id, marker_open } }
}

function closeMediaLocationMarkers() {
  return dispatch => {
    dispatch(close())
  }

  function close() { return { type: albumsConstants.CLOSE_MEDIA_LOCATION_MARKERS } }
}

function moveMedia(media_id, album_id) {
  return dispatch => {
    mediaService.moveMedia(media_id, album_id)
      .then(function(res) {
        if (res.ack == 'ok') {
          dispatch(move(media_id, album_id))
          Popup.close()
          toastr.success('Success', res.msg)
        } else {
          toastr.error('Error', res.msg)
        }
      })
  }
  function move(media_id, album_id) { return { type: albumsConstants.REMOVE_MEDIA, media_id, album_id } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return dispatch => {
    dispatch(request(id))

    albumsService.delete(id)
      .then(function(res) {
        if (res.ack == 'ok') {
          dispatch(success(id))
          toastr.success('Success', res.msg)
        } else {
          dispatch(failure(id, res.msg))
          toastr.error('Error', res.msg)
        }
      })
  }

  function request(id) { return { type: albumsConstants.DELETE_REQUEST, id } }
  function success(id) { return { type: albumsConstants.DELETE_SUCCESS, id } }
  function failure(id, err) { return { type: albumsConstants.DELETE_FAILURE, id, err } }
}
