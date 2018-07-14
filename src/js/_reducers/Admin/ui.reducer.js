
import { adminConstants } from '../../_constants'

const initialState = {
  modals: {
    album_rename: false,
    album_dates: false,
    album_map: false,
    album_delete: false
  }
}

export function adminUi(state = initialState, action) {
  switch (action.type) {

  case adminConstants.UI_MODAL_OPEN:
    return {
      ...state,
      modals: {
        ...state.modals,
        [action.modal_id]: true
      }
    }
  case adminConstants.UI_MODAL_CLOSE:
    return {
      ...state,
      modals: {
        ...state.modals,
        [action.modal_id]: false
      }
    }

  default:
    return state
  }
}