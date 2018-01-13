
import {toastr} from 'react-redux-toastr'

import { albumsConstants } from '../../_constants'
import { frontService } from '../../_services'

export const frontActions = {
  getList
}

function getList() {
  return dispatch => {
    dispatch(request())

    frontService.getList()
      .then(function(res) {
        if (res.ack == 'ok') {
          dispatch(success(res.data))
        } else {
          dispatch(failure(res.msg))
        }
      })
  }

  function request() { return { type: albumsConstants.GET_FRONT_LIST_REQUEST } }
  function success(albums) { return { type: albumsConstants.GET_FRONT_LIST_SUCCESS, albums } }
  function failure(err) { return { type: albumsConstants.GET_FRONT_LIST_FAILURE, err } }
}
