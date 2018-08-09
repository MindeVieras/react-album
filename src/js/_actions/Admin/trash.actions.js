
import { trashConstants } from 'Constants'
import { trashService } from 'Services'

export const trashActions = {
  getList,
  restore,
  delete: _delete
}

function getList() {
  return dispatch => {
    dispatch(request())

    trashService.getList()
      .then(res => {
        if (res.ack == 'ok') {
          dispatch(success(res.list))
        } else {
          dispatch(failure(res.msg))
        }
      })
  }

  function request() { return { type: trashConstants.GETLIST_REQUEST } }
  function success(list) { return { type: trashConstants.GETLIST_SUCCESS, list } }
  function failure(err) { return { type: trashConstants.GETLIST_FAILURE, err } }
}

function restore(id) {
  return dispatch => {
    dispatch(request(id))

    trashService.restore(id)
      .then(res => {
        if (res.ack == 'ok') {
          dispatch(success(id))
        } else {
          dispatch(failure(id, res.msg))
        }
      })
  }

  function request(id) { return { type: trashConstants.RESTORE_REQUEST, id } }
  function success(id) { return { type: trashConstants.RESTORE_SUCCESS, id } }
  function failure(id, err) { return { type: trashConstants.RESTORE_FAILURE, id, err } }
}

function _delete(id) {
  return dispatch => {
    dispatch(request(id))

    trashService.delete(id)
      .then(res => {
        if (res.ack == 'ok') {
          dispatch(success(id))
        } else {
          dispatch(failure(id, res.msg))
        }
      })
  }

  function request(id) { return { type: trashConstants.DELETE_REQUEST, id } }
  function success(id) { return { type: trashConstants.DELETE_SUCCESS, id } }
  function failure(id, err) { return { type: trashConstants.DELETE_FAILURE, id, err } }
}
