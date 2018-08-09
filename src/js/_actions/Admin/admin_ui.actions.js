
import { adminConstants } from 'Constants'

export const adminUiActions = {
  modalOpen, modalClose,
  lightboxOpen, lightboxClose
}


/*
 * Admin Modals Open/Close
 * calls modalOpen, modalClose
 */

function modalOpen(modal_id) {
  return dispatch => {
    dispatch(open(modal_id))
  }

  function open(modal_id) { return { type: adminConstants.UI_MODAL_OPEN, modal_id } }
}

function modalClose(modal_id) {
  return dispatch => {
    dispatch(close(modal_id))
  }

  function close(modal_id) { return { type: adminConstants.UI_MODAL_CLOSE, modal_id } }
}

/*
 * Admin Media Lightbox Open/Close
 * calls lightboxOpen, lightboxClose
 */

function lightboxOpen(id) {
  return dispatch => {
    dispatch(open(id))
  }

  function open(id) { return { type: adminConstants.UI_LIGHTBOX_OPEN, id } }
}

function lightboxClose() {
  return dispatch => {
    dispatch(close())
  }

  function close() { return { type: adminConstants.UI_LIGHTBOX_CLOSE } }
}
