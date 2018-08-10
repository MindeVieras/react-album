
import {toastr} from 'react-redux-toastr'
import Popup from 'react-popup'

import { albumsConstants } from 'Constants'
import { albumsService, mediaService, trashService } from 'Services'

export const albumsActions = {
  getList, getListDates, addToList,
  getOne,
  rename, changeDate,
  setMapEdit, setMapCenter, setMapZoom,
  setLocation, updateLocation, removeLocation,
  clearSelected,
  submitMedia, setMediaData, setMediaPhase, setMediaMediaId,
  saveMediaMetadata, saveRekognitionLabels,
  generateImageThumbs, generateVideos,
  setMediaLocation, updateMediaLocation, removeMediaLocation,
  openMediaLocationMarker, closeMediaLocationMarkers,
  setMediaPagerPage, setMediaPagerGrid,
  moveMedia, trashMedia, deleteMedia, clearMedia,
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
      .then(res => {
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
      .then(res => {
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
      .then(res => {
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
      .then(res => {
        if (res.ack == 'ok') {
          dispatch(rename(payload))
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
      .then(res => {
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


/*
 * Album locations map actions
 * calls rename, changeDate
 */

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


/*
 * Album location actions
 * calls rename, changeDate
 */

function setLocation(album_id, location) {
  return dispatch => {
    albumsService.setLocation(album_id, location)
      .then(res => {
        dispatch(set(location))
      })
  }
  function set(location) { return { type: albumsConstants.SET_LOCATION, location } }
}

function updateLocation(album_id, location) {
  return dispatch => {
    albumsService.updateLocation(album_id, location)
      .then(res => {
        dispatch(set(location))
      })
  }
  function set(location) { return { type: albumsConstants.SET_LOCATION, location } }
}

function removeLocation(id) {
  return dispatch => {
    albumsService.removeLocation(id)
      .then(res => {
        dispatch(remove(id))
      })
  }
  function remove(id) { return { type: albumsConstants.REMOVE_LOCATION, id } }
}


/*
 * Album Media actions
 * calls submitMedia, setMediaData
 *       setMediaMediaId
 *       trashMedia
 */

function submitMedia(id, phase, fromServer) {
  return dispatch => {
    dispatch(submit(id, phase, fromServer))
  }

  function submit(id, phase, fromServer) { return { type: albumsConstants.SUBMIT_MEDIA, id, phase, fromServer } }
}

function setMediaData(id, data) {
  return dispatch => {
    dispatch(set(id, data))
  }

  function set(id, data) { return { type: albumsConstants.SET_MEDIA_DATA, id, data } }
}

function setMediaPhase(id, phase) {
  return dispatch => {
    dispatch(set(id, phase))
  }

  function set(id, phase) { return { type: albumsConstants.SET_MEDIA_PHASE, id, phase } }
}

function setMediaMediaId(id, media_id) {
  return dispatch => {
    dispatch(set(id, media_id))
  }

  function set(id, media_id) { return { type: albumsConstants.SET_MEDIA_MEDIA_ID, id, media_id } }
}

function trashMedia(media_id) {
  return dispatch => {
    mediaService.putToTrash(media_id)
      .then(res => {
        if (res.ack == 'ok') {
          dispatch(remove(media_id))
          toastr.success('Success', res.msg)
        } else if (res.ack == 'err') {
          toastr.error('Error', res.msg)
        }
      })
  }

  function remove(media_id) { return { type: albumsConstants.REMOVE_MEDIA, media_id } }
}


/*
 * Album Media meta actions
 * calls saveMediaMetadata, saveRekognitionLabels
 */

function saveMediaMetadata(id, media_id) {
  return dispatch => {
    dispatch(request(id))

    mediaService.saveMetadata(media_id)
      .then(res => {
        if (res.ack == 'ok') {
          dispatch(success(id, res.metadata))
          if (res.metadata && res.metadata.location) {
            let loc = {
              lat: res.metadata.location.lat,
              lng: res.metadata.location.lon
            }
            dispatch(setLocation(media_id, loc))
          }
        } else if (res.ack == 'err') {
          dispatch(failure(id, res.msg))
        }
      })
  }

  function request(id) { return { type: albumsConstants.SAVE_MEDIA_METADATA_REQUEST, id } }
  function success(id, metadata) { return { type: albumsConstants.SAVE_MEDIA_METADATA_SUCCESS, id, metadata } }
  function failure(id, err) { return { type: albumsConstants.SAVE_MEDIA_METADATA_FAILURE, id, err } }
  function setLocation(media_id, location) { return { type: albumsConstants.SET_MEDIA_LOCATION, media_id, location } }
}

function saveRekognitionLabels(id, media_id) {
  return dispatch => {
    dispatch(request(id))

    mediaService.saveRekognitionLabels(media_id)
      .then(res => {
        if (res.ack == 'ok') {
          dispatch(success(id, res.rekognition_labels))
        } else if (res.ack == 'err') {
          dispatch(failure(id, res.msg))
        }
      })
  }

  function request(id) {
    return {
      type: albumsConstants.SAVE_MEDIA_REKOGNITION_LABELS_REQUEST, id
    }
  }
  function success(id, rekognition_labels) {
    return {
      type: albumsConstants.SAVE_MEDIA_REKOGNITION_LABELS_SUCCESS, id, rekognition_labels
    }
  }
  function failure(id, err) {
    return {
      type: albumsConstants.SAVE_MEDIA_REKOGNITION_LABELS_FAILURE, id, err
    }
  }
}


/*
 * Album Media image/video styles actions
 * calls generateImageThumbs, generateVideos
 */

function generateImageThumbs(id, media_id) {
  return dispatch => {
    dispatch(request(id))

    mediaService.generateImageThumbs(media_id)
      .then(res => {
        if (res.ack == 'ok') {
          dispatch(success(id, res.thumbs))
        } else if (res.ack == 'err') {
          dispatch(failure(id, res.msg))
        }
      })
  }

  function request(id) { return { type: albumsConstants.GENERATE_IMG_THUMBS_REQUEST, id } }
  function success(id, thumbs) { return { type: albumsConstants.GENERATE_IMG_THUMBS_SUCCESS, id, thumbs } }
  function failure(id, err) { return { type: albumsConstants.GENERATE_IMG_THUMBS_FAILURE, id, err } }
}

function generateVideos(id, media_id) {
  return dispatch => {
    dispatch(request(id))

    mediaService.generateVideos(media_id)
      .then(res => {
        if (res.ack == 'ok') {
          dispatch(success(id, res.videos))
        } else if (res.ack == 'err') {
          dispatch(failure(id, res.msg))
        }
      })
  }

  function request(id) { return { type: albumsConstants.GENERATE_VIDEOS_REQUEST, id } }
  function success(id, videos) { return { type: albumsConstants.GENERATE_VIDEOS_SUCCESS, id, videos } }
  function failure(id, err) { return { type: albumsConstants.GENERATE_VIDEOS_FAILURE, id, err } }
}


/*
 * Album Media location actions
 * calls setMediaLocation, updateMediaLocation, removeMediaLocation
 *       openMediaLocationMarker, closeMediaLocationMarkers
 */

function setMediaLocation(media_id, location) {
  return dispatch => {
    mediaService.setLocation(media_id, location)
      .then(res => {
        dispatch(set(media_id, location))
      })
  }
  function set(media_id, location) { return { type: albumsConstants.SET_MEDIA_LOCATION, media_id, location } }
}

function updateMediaLocation(media_id, location) {
  return dispatch => {
    mediaService.updateLocation(media_id, location)
      .then(res => {
        dispatch(set(media_id, location))
      })
  }
  function set(media_id, location) { return { type: albumsConstants.SET_MEDIA_LOCATION, media_id, location } }
}

function removeMediaLocation(media_id) {
  return dispatch => {
    mediaService.removeLocation(media_id)
      .then(res => {
        dispatch(remove(media_id))
      })
  }
  function remove(media_id) { return { type: albumsConstants.REMOVE_MEDIA_LOCATION, media_id } }
}

function openMediaLocationMarker(media_id, marker_open) {
  return dispatch => {
    dispatch(open(media_id, marker_open))
  }

  function open(media_id, marker_open) {
    return {
      type: albumsConstants.OPEN_MEDIA_LOCATION_MARKER, media_id, marker_open
    }
  }
}

function closeMediaLocationMarkers() {
  return dispatch => {
    dispatch(close())
  }

  function close() { return { type: albumsConstants.CLOSE_MEDIA_LOCATION_MARKERS } }
}


/*
 * Album Media pager actions
 * calls setMediaPagerPage
 *       setMediaPagerGrid
 */

function setMediaPagerPage(page) {
  return dispatch => {
    dispatch(set(page))
  }

  function set(page) { return { type: albumsConstants.SET_MEDIA_PAGER_PAGE, page } }
}

function setMediaPagerGrid(cols, rows) {
  return dispatch => {
    dispatch(set(cols, rows))
  }

  function set(cols, rows) { return { type: albumsConstants.SET_MEDIA_PAGER_GRID, cols, rows } }
}







function clearSelected() {
  return dispatch => {
    dispatch(clear())
  }

  function clear() { return { type: albumsConstants.CLEAR_SELECTED } }
}


function moveMedia(media_id, album_id) {
  return dispatch => {
    mediaService.moveMedia(media_id, album_id)
      .then(res => {
        if (res.ack == 'ok') {
          dispatch(remove(media_id, album_id))
          Popup.close()
          toastr.success('Success', res.msg)
        } else {
          toastr.error('Error', res.msg)
        }
      })
  }
  function remove(media_id) { return { type: albumsConstants.REMOVE_MEDIA_ONE, media_id } }
}

function trashMedia(media_id) {
  return dispatch => {
    mediaService.putToTrash(media_id)
      .then(res => {
        if (res.ack == 'ok') {
          dispatch(remove(media_id))
          toastr.success('Success', res.msg)
        } else if (res.ack == 'err') {
          toastr.error('Error', res.msg)
        }
      })
  }

  function remove(media_id) { return { type: albumsConstants.REMOVE_MEDIA_ONE, media_id } }
}

function deleteMedia(media_id) {
  return dispatch => {
    trashService.delete(media_id)
      .then(res => {
        if (res.ack == 'ok') {
          dispatch(remove(media_id))
          toastr.success('Success', res.msg)
        } else {
          toastr.error('Error', res.msg)
        }
      })
  }

  function remove(media_id) { return { type: albumsConstants.REMOVE_MEDIA_ONE, media_id } }
}

function clearMedia() {
  return dispatch => {
    dispatch(clear())
  }

  function clear() { return { type: albumsConstants.CLEAR_MEDIA } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return dispatch => {
    dispatch(request(id))

    albumsService.delete(id)
      .then(res => {
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
