
import { uploaderConstants } from '../_constants'
import { mediaService } from '../_services'

export const uploaderActions = {
  submitFile,
  setStatus,
  removeFile,
  clearFiles,
  getImageThumbs,
  generateImageThumbs,
  getMetadata,
  metadata,
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

function removeFile(id) {
  return dispatch => {
    dispatch(remove(id))
  }

  function remove(id) { return { type: uploaderConstants.REMOVE_FILE, id } }
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

function generateImageThumbs(id, key) {
  return dispatch => {
    dispatch(request(id))

    mediaService.generateImageThumbs(key)
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

function getMetadata(id, metadata) {
  return dispatch => {
    dispatch(get(id, metadata))
  }

  function get(id, metadata) { return { type: uploaderConstants.GET_METADATA, id, metadata } }
}

function metadata(id, media_id, key) {
  return dispatch => {
    dispatch(request(id))

    mediaService.saveImageMetadata(media_id, key)
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

function rekognitionLabels(id, media_id, key) {
  return dispatch => {
    dispatch(request(id))

    mediaService.saveRekognitionLabels(media_id, key)
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
