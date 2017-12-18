
import { uploaderConstants } from '../_constants'

export const uploaderActions = {
  submitFile,
  removeFile,
  clearFiles
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
