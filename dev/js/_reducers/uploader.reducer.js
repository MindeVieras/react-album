
import { uploaderConstants } from '../_constants'

export function uploader(state = [], action) {
  switch (action.type) {
  case uploaderConstants.MEDIA_SUCCESS:
    return [...state, action.file]
  case uploaderConstants.MEDIA_CLEAR:
    return []
  default:
    return state
  }
}
