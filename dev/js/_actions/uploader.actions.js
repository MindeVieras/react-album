
import { uploaderConstants } from '../_constants'

export const uploaderActions = {
  media,
  clear
}

function media(file) {
  return dispatch => {
    dispatch(success(file))
  }
  function success(file) { return { type: uploaderConstants.MEDIA_SUCCESS, file } }
}

function clear() {
  return { type: uploaderConstants.MEDIA_CLEAR }
}

