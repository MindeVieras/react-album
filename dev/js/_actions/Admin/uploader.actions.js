
import { toastr } from 'react-redux-toastr'

import { uploaderConstants } from '../../_constants'
import { mediaService } from '../../_services'

export const uploaderActions = {
  submitFile,
  setStatus,
  setMediaId,
  setMime,
  setFilename,
  setFilesize,
  removeFile,
  clearFiles,
  getImageThumbs,
  getVideos,
  generateImageThumbs,
  generateVideos,
  getMetadata,
  saveMetadata,
  getRekognitionLabels,
  rekognitionLabels
}

function submitFile(id, status, fromServer) {
  return dispatch => {
    dispatch(submit(id, status, fromServer))
  }

  function submit(id, status, fromServer) { return { type: uploaderConstants.SUBMIT_FILE, id, status, fromServer } }
}

function setStatus(id, status) {
  return dispatch => {
    dispatch(set(id, status))
  }

  function set(id, status) { return { type: uploaderConstants.SET_FILE_STATUS, id, status } }
}

function setMediaId(id, media_id) {
  return dispatch => {
    dispatch(set(id, media_id))
  }

  function set(id, media_id) { return { type: uploaderConstants.SET_FILE_MEDIA_ID, id, media_id } }
}

function setMime(id, mime) {
  return dispatch => {
    dispatch(set(id, mime))
  }

  function set(id, mime) { return { type: uploaderConstants.SET_FILE_MIME, id, mime } }
}

function setFilename(id, filename) {
  return dispatch => {
    dispatch(set(id, filename))
  }

  function set(id, filename) { return { type: uploaderConstants.SET_FILENAME, id, filename } }
}

function setFilesize(id, filesize) {
  return dispatch => {
    dispatch(set(id, filesize))
  }

  function set(id, filesize) { return { type: uploaderConstants.SET_FILESIZE, id, filesize } }
}

function removeFile(media_id) {
  return dispatch => {
    mediaService.putToTrash(media_id)
      .then(function(res) {
        if (res.ack == 'ok') {
          dispatch(remove(media_id))
          toastr.success('Success', res.msg)
        } else if (res.ack == 'err') {
          toastr.error('Error', res.msg)
        }
      })
  }

  function remove(media_id) { return { type: uploaderConstants.REMOVE_FILE, media_id } }
}

function clearFiles() {
  return dispatch => {
    dispatch(clear())
  }

  function clear() { return { type: uploaderConstants.CLEAR_FILES } }
}

function getImageThumbs(id, thumbs) {
  return dispatch => {
    dispatch(get(id, thumbs))
  }

  function get(id, thumbs) { return { type: uploaderConstants.GET_IMG_THUMBS, id, thumbs } }
}

function generateImageThumbs(id, media_id) {
  return dispatch => {
    dispatch(request(id))

    mediaService.generateImageThumbs(media_id)
      .then(function(res) {
        if (res.ack == 'ok') {
          dispatch(success(id, res.thumbs))
        } else if (res.ack == 'err') {
          dispatch(failure(id, res.msg))
        }
      })
  }

  function request(id) { return { type: uploaderConstants.GENERATE_IMG_THUMBS_REQUEST, id } }
  function success(id, thumbs) { return { type: uploaderConstants.GENERATE_IMG_THUMBS_SUCCESS, id, thumbs } }
  function failure(id, error) { return { type: uploaderConstants.GENERATE_IMG_THUMBS_FAILURE, id, error } }
}

function getVideos(id, videos) {
  return dispatch => {
    dispatch(get(id, videos))
  }

  function get(id, videos) { return { type: uploaderConstants.GET_VIDEOS, id, videos } }
}

function generateVideos(id, key) {
  return dispatch => {
    dispatch(request(id))

    mediaService.generateVideos(key)
      .then(function(res) {
        if (res.ack == 'ok') {
          dispatch(success(id, res.videos))
        } else if (res.ack == 'err') {
          dispatch(failure(id, res.msg))
        }
      })
  }

  function request(id) { return { type: uploaderConstants.GENERATE_VIDEOS_REQUEST, id } }
  function success(id, videos) { return { type: uploaderConstants.GENERATE_VIDEOS_SUCCESS, id, videos } }
  function failure(id, error) { return { type: uploaderConstants.GENERATE_VIDEOS_FAILURE, id, error } }
}

function getMetadata(id, metadata) {
  return dispatch => {
    dispatch(get(id, metadata))
  }

  function get(id, metadata) { return { type: uploaderConstants.GET_METADATA, id, metadata } }
}

function saveMetadata(id, media_id) {
  return dispatch => {
    dispatch(request(id))

    mediaService.saveMetadata(media_id)
      .then(function(res) {
        if (res.ack == 'ok') {
          dispatch(success(id, res.metadata))
        } else if (res.ack == 'err') {
          dispatch(failure(id, res.msg))
        }
      })
  }

  function request(id) { return { type: uploaderConstants.METADATA_REQUEST, id } }
  function success(id, metadata) { return { type: uploaderConstants.METADATA_SUCCESS, id, metadata } }
  function failure(id, error) { return { type: uploaderConstants.METADATA_FAILURE, id, error } }
}

function getRekognitionLabels(id, rekognition_labels) {
  return dispatch => {
    dispatch(get(id, rekognition_labels))
  }

  function get(id, rekognition_labels) {
    return { type: uploaderConstants.GET_REKOGNITION_LABELS, id, rekognition_labels }
  }
}

function rekognitionLabels(id, media_id) {
  return dispatch => {
    dispatch(request(id))

    mediaService.saveRekognitionLabels(media_id)
      .then(function(res) {
        if (res.ack == 'ok') {
          dispatch(success(id, res.rekognition_labels))
        } else if (res.ack == 'err') {
          dispatch(failure(id, res.msg))
        }
      })
  }

  function request(id) {
    return {
      type: uploaderConstants.REKOGNITION_LABELS_REQUEST, id
    }
  }
  function success(id, rekognition_labels) {
    return {
      type: uploaderConstants.REKOGNITION_LABELS_SUCCESS, id, rekognition_labels
    }
  }
  function failure(id, error) {
    return {
      type: uploaderConstants.REKOGNITION_LABELS_FAILURE, id, error
    }
  }
}
