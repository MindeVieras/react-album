
import { uploaderConstants } from '../_constants'

const initialState = {
  files: []
}

export function uploader(state = initialState, action) {
  switch (action.type) {
  case uploaderConstants.SUBMIT_FILE:
    return {
      ...state,
      files: [
        ...state.files,
        {
          id: action.id,
          status: action.status,
          fromServer: action.fromServer
        }
      ]
    }
  case uploaderConstants.SET_FILE_STATUS:
    return {
      ...state,
      files: state.files.map(file => {
        if (file.id === action.id) {
          const { ...fileCopy } = file
          return { ...fileCopy, status: action.status }
        }
        return file
      })
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
  case uploaderConstants.GET_IMG_THUMBS:
    return {
      ...state,
      files: state.files.map(file => {
        if (file.id === action.id) {
          const { ...fileCopy } = file
          return { ...fileCopy, thumbs: action.thumbs }
        }
        return file
      })
    }
  case uploaderConstants.GENERATE_IMG_THUMBS_REQUEST:
    return {
      ...state,
      files: state.files.map(file => {
        if (file.id === action.id) {
          const { ...fileCopy } = file
          return { ...fileCopy, thumbs: { ack: 'loading', msg: 'Generating images thumbnails...' } }
        }
        return file
      })
    }
  case uploaderConstants.GENERATE_IMG_THUMBS_SUCCESS:
    return {
      ...state,
      files: state.files.map(file => {
        if (file.id === action.id) {
          const { ...fileCopy } = file
          return { ...fileCopy, thumbs: { ack: 'ok' } }
        }
        return file
      })
    }
  case uploaderConstants.GENERATE_IMG_THUMBS_FAILURE:
    return {
      ...state,
      files: state.files.map(file => {
        if (file.id === action.id) {
          const { ...fileCopy } = file
          return { ...fileCopy, thumbs: { ack: 'err', msg: action.error } }
        }
        return file
      })
    }
  case uploaderConstants.GET_METADATA:
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
  case uploaderConstants.METADATA_REQUEST:
    return {
      ...state,
      files: state.files.map(file => {
        if (file.id === action.id) {
          const { ...fileCopy } = file
          return { ...fileCopy, metadata: { ack: 'loading', msg: 'Metadata processing...' } }
        }
        return file
      })
    }
  case uploaderConstants.METADATA_SUCCESS:
    return {
      ...state,
      files: state.files.map(file => {
        if (file.id === action.id) {
          const { ...fileCopy } = file
          return { ...fileCopy, metadata: { ack: 'ok', ...action.metadata } }
        }
        return file
      })
    }
  case uploaderConstants.METADATA_FAILURE:
    return {
      ...state,
      files: state.files.map(file => {
        if (file.id === action.id) {
          const { ...fileCopy } = file
          return { ...fileCopy, metadata: { ack: 'err', msg: action.error } }
        }
        return file
      })
    }
  case uploaderConstants.GET_REKOGNITION_LABELS:
    return {
      ...state,
      files: state.files.map(file => {
        if (file.id === action.id) {
          const { ...fileCopy } = file
          return { ...fileCopy, rekognition_labels: action.rekognition_labels }
        }
        return file
      })
    }
  case uploaderConstants.REKOGNITION_LABELS_REQUEST:
    return {
      ...state,
      files: state.files.map(file => {
        if (file.id === action.id) {
          const { ...fileCopy } = file
          return { ...fileCopy, rekognition_labels: { ack: 'loading', msg: 'Rekognition labels processing...' } }
        }
        return file
      })
    }
  case uploaderConstants.REKOGNITION_LABELS_SUCCESS:
    return {
      ...state,
      files: state.files.map(file => {
        if (file.id === action.id) {
          const { ...fileCopy } = file
          return { ...fileCopy, rekognition_labels: { ack: 'ok', ...action.rekognition_labels } }
        }
        return file
      })
    }
  case uploaderConstants.REKOGNITION_LABELS_FAILURE:
    return {
      ...state,
      files: state.files.map(file => {
        if (file.id === action.id) {
          const { ...fileCopy } = file
          return { ...fileCopy, rekognition_labels: { ack: 'err', msg: action.error } }
        }
        return file
      })
    }
  default:
    return state
  }
}
