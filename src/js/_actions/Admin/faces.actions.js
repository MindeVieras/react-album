
import { toastr } from 'react-redux-toastr'

import { facesConstants } from 'Constants'
import { facesService } from 'Services'

export const facesActions = {
  getCollection,
  deleteFace
}

function getCollection() {
  return dispatch => {
    dispatch(request())

    facesService.getCollection()
      .then(res => {
        if (res.ack == 'ok')
          dispatch(success(res.data))
        else
          dispatch(failure(res.msg))
      })
  }

  function request() { return { type: facesConstants.GET_COLLECTION_REQUEST } }
  function success(faces) { return { type: facesConstants.GET_COLLECTION_SUCCESS, faces } }
  function failure(err) { return { type: facesConstants.GET_COLLECTION_FAILURE, err } }
}

function deleteFace(id) {
  return dispatch => {
    dispatch(request(id))

    facesService.deleteFace(id)
      .then(res => {
        if (res.ack == 'ok') {
          dispatch(success(id))
          toastr.success('Success', res.msg, { timeOut: 3000 })
        } else {
          dispatch(failure(id, res.msg))
          toastr.error('Error', res.msg, { timeOut: 3000 })
        }
      })
  }

  function request(id) { return { type: facesConstants.DELETE_FACE_REQUEST, id } }
  function success(id) { return { type: facesConstants.DELETE_FACE_SUCCESS, id } }
  function failure(id, err) { return { type: facesConstants.DELETE_FACE_FAILURE, id, err } }
}
