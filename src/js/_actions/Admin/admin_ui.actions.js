
import { adminConstants } from '../../_constants'

export const adminUiActions = {
  modalOpen, modalClose
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
