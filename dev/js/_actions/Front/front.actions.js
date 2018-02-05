
import { frontConstants } from '../../_constants'
import { frontService } from '../../_services'

export const frontActions = {
  getList,
  getListMore
}

function getList(page, limit, media_limit) {
  return dispatch => {
    dispatch(request())

    frontService.getList(page, limit, media_limit)
      .then(function(res) {
        if (res.ack == 'ok') {
          dispatch(success(res.data))
        } else {
          dispatch(failure(res.msg))
        }
      })
  }

  function request() { return { type: frontConstants.GETLIST_REQUEST } }
  function success(albums) { return { type: frontConstants.GETLIST_SUCCESS, albums } }
  function failure(err) { return { type: frontConstants.GETLIST_FAILURE, err } }
}

function getListMore(page, limit, media_limit) {
  return dispatch => {
    // dispatch(request())

    frontService.getList(page, limit, media_limit)
      .then(function(res) {
        if (res.ack == 'ok') {
          dispatch(loadMore(res.data))
        } else {
          // dispatch(failure(res.msg))
        }
      })
  }

  function request() { return { type: frontConstants.GETLIST_REQUEST } }
  function loadMore(albums) { return { type: frontConstants.GETLIST_LOAD_MORE, albums } }
  function failure(err) { return { type: frontConstants.GETLIST_FAILURE, err } }
}
