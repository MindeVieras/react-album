
import { uploaderConstants } from '../_constants'
import { mediaService } from '../_services'

export const uploaderActions = {
  submitFile,
  removeFile,
  clearFiles,
  getMetadata,
  metadata
}

function submitFile(id, status, fromServer) {
  return dispatch => {
    dispatch(submit(id, status, fromServer))
  }

  function submit(id, status, fromServer) { return { type: uploaderConstants.SUBMIT_FILE, id, status, fromServer } }
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
        console.log(res)
        if (res.ack == 'ok') {
          dispatch(success(id, res.metadata))
        } else {
          // dispatch(failure(res.msg))
        }
      })
  }

  function request(id) { return { type: uploaderConstants.METADATA_REQUEST, id } }
  function success(id, metadata) { return { type: uploaderConstants.METADATA_SUCCESS, id, metadata } }
  // function failure(err) { return { type: albumsConstants.GETLIST_FAILURE, err } }
}
