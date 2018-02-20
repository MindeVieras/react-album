
import {toastr} from 'react-redux-toastr'
import Popup from 'react-popup'

import { albumsConstants } from '../../_constants'
import { albumsService } from '../../_services'

export const albumsActions = {
  addToList,
  getList,
  getListDates,
  getOne,
  getLocations,
  removeLocation,
  setLocation,
  updateLocation,
  rename,
  changeDate,
  delete: _delete
}

function addToList(album) {
  return dispatch => {
    dispatch(add(album))
  }

  function add(album) { return { type: albumsConstants.ADD_TO_LIST, album } }
}

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

  function request() { return { type: albumsConstants.GETLIST_REQUEST } }
  function success(albums) { return { type: albumsConstants.GETLIST_SUCCESS, albums } }
  function failure(err) { return { type: albumsConstants.GETLIST_FAILURE, err } }
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

  function request() { return { type: albumsConstants.GETLISTDATES_REQUEST } }
  function success(dates) { return { type: albumsConstants.GETLISTDATES_SUCCESS, dates } }
  function failure(err) { return { type: albumsConstants.GETLISTDATES_FAILURE, err } }
}

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

  function request() { return { type: albumsConstants.GETONE_REQUEST } }
  function success(album) { return { type: albumsConstants.GETONE_SUCCESS, album } }
  function failure(err) { return { type: albumsConstants.GETONE_FAILURE, err } }
}

function getLocations(id) {
  return dispatch => {
    dispatch(request())

    albumsService.getLocations(id)
      .then(function(res) {
        if (res.ack == 'ok') {
          dispatch(success(res.data))
        } else {
          dispatch(failure(res.msg))
        }
      })
  }

  function request() { return { type: albumsConstants.GETLOCATIONS_REQUEST } }
  function success(locations) { return { type: albumsConstants.GETLOCATIONS_SUCCESS, locations } }
  function failure(err) { return { type: albumsConstants.GETLOCATIONS_FAILURE, err } }
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

function rename(payload) {
  return dispatch => {
    albumsService.rename(payload.name, payload.id)
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
