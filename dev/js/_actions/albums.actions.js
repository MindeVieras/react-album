
import { albumsConstants } from '../_constants'
import { albumsService } from '../_services'
import { alertActions } from './'
// import { history } from '../_helpers'

export const albumsActions = {
  getList,
  getOne,
  delete: _delete
}

function getList() {
  return dispatch => {
    dispatch(request())

    albumsService.getList()
      .then(function(res) {
        if (res.ack == 'ok') {
          dispatch(success(res.data))
        } else {
          dispatch(failure(res.msg))
        }
      })
  }

  function request() { return { type: albumsConstants.GETLIST_REQUEST } }
  function success(albums) { return { type: albumsConstants.GETLIST_SUCCESS, albums } }
  function failure(err) { return { type: albumsConstants.GETLIST_FAILURE, err } }
}

function getOne(id) {
  return dispatch => {
    dispatch(request())

    albumsService.getOne(id)
      .then(function(res) {
        if (res.ack == 'ok') {
          dispatch(success(res.data))
        } else {
          dispatch(failure(res.msg))
        }
      })
  }

  function request() { return { type: albumsConstants.GETONE_REQUEST } }
  function success(album) { return { type: albumsConstants.GETONE_SUCCESS, album } }
  function failure(err) { return { type: albumsConstants.GETONE_FAILURE, err } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return dispatch => {
    dispatch(request(id))

    albumsService.delete(id)
      .then(function(res) {
        if (res.ack == 'ok') {
          dispatch(success(id))
          dispatch(alertActions.success(res.msg))
        } else {
          dispatch(failure(id, res.msg))
          dispatch(alertActions.error(res.msg))
        }
      })
  }

  function request(id) { return { type: albumsConstants.DELETE_REQUEST, id } }
  function success(id) { return { type: albumsConstants.DELETE_SUCCESS, id } }
  function failure(id, err) { return { type: albumsConstants.DELETE_FAILURE, id, err } }
}
