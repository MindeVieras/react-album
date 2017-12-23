
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
  case uploaderConstants.SET_METADATA:
    return {
      ...state,
      files: state.files.map(file => {
        if (file.id === action.id) {
          const { ...fileCopy } = file
          return { ...fileCopy, metadata: action.metadata }
        }
        return file
      })
    }
  default:
    return state
  }
}
