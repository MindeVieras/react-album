
import { toastr } from 'react-redux-toastr'

import { userConstants } from 'Constants'
import { userService } from 'Services'
import { history } from 'Helpers'

export const userActions = {
  create,
  getList,
  getOne,
  delete: _delete
}

function create(user) {
  return dispatch => {
    dispatch(request())

    userService.create(user)
      .then(res => {
        if (res.ack == 'ok') {
          dispatch(success())
          history.push('/admin/users/' + res.user.username)
        } else {
          dispatch(failure(res.msg))
        }
      })
  }

  function request() { return { type: userConstants.CREATE_REQUEST } }
  function success(user) { return { type: userConstants.CREATE_SUCCESS, user } }
  function failure(err) { return { type: userConstants.CREATE_FAILURE, err } }
}

function getList() {
  return dispatch => {
    dispatch(request())

    userService.getList()
      .then(res => {
        if (res.ack == 'ok')
          dispatch(success(res.list))
        else
          dispatch(failure(res.msg))
      })
  }

  function request() { return { type: userConstants.GETLIST_REQUEST } }
  function success(users) { return { type: userConstants.GETLIST_SUCCESS, users } }
  function failure(err) { return { type: userConstants.GETLIST_FAILURE, err } }
}

function getOne(username) {
  return dispatch => {
    dispatch(request())

    userService.getOne(username)
      .then(res => {
        if (res.ack == 'ok') {
          dispatch(success(res.data))
        } else {
          dispatch(failure(res.msg))
        }
      })
  }

  function request() { return { type: userConstants.GETONE_REQUEST } }
  function success(user) { return { type: userConstants.GETONE_SUCCESS, user } }
  function failure(err) { return { type: userConstants.GETONE_FAILURE, err } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return dispatch => {
    dispatch(request(id))

    userService.delete(id)
      .then(res => {
        if (res.ack == 'ok') {
          dispatch(success(id))
        } else {
          dispatch(failure(id, res.msg))
          toastr.error('Error', res.msg, { timeOut: 3000 })
        }
      })
  }

  function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
  function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
  function failure(id, err) { return { type: userConstants.DELETE_FAILURE, id, err } }
}
