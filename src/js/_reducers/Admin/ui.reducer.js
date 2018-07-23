
import { adminConstants } from '../../_constants'

const initialState = {
  modals: {},
  lightbox: {
    isOpen: false
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

  case adminConstants.UI_LIGHTBOX_OPEN:
    return {
      ...state,
      lightbox: {
        isOpen: true,
        initialId: action.id
      }
    }
  case adminConstants.UI_LIGHTBOX_CLOSE:
    return {
      ...state,
      lightbox: {
        isOpen: false
      }
    }

  default:
    return state
  }
}
