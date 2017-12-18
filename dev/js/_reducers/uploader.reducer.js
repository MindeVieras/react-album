
import { uploaderConstants } from '../_constants'

const initialState = {
  files: []
}

export function uploader(state = initialState, action) {
  switch (action.type) {
  case uploaderConstants.SUBMIT_FILE:
    return {
      ...state,
      files: [ ...state.files, { id: action.id, status: action.status, fromServer: action.fromServer } ]
    }
  case uploaderConstants.REMOVE_FILE:
    return {
      ...state,
      files: state.files.filter(file => file.id !== action.id)
    }
  case uploaderConstants.CLEAR_FILES:
    return {
      ...state,
      files: []
    }
  default:
    return state
  }
}
