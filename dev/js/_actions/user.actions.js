import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    create,
    getList,
    getOne,
    delete: _delete
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(function(res) {
                // console.log(res);
                if (res.ack == 'ok') {
                    dispatch(success(res.data));
                    history.push('/');
                } else {
                    dispatch(failure(res.msg));
                    dispatch(alertActions.error(res.msg));
                }
            });
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function create(user) {
  return dispatch => {
    dispatch(request(user));

    userService.create(user)
      .then(function(res){
        if (res.ack == 'ok') {
          // console.log(res);
          dispatch(success());
          // history.push('/login');
          dispatch(alertActions.success('Registration successful'));
        } else {
          // console.log(res);
          dispatch(failure(res.msg));
          dispatch(alertActions.error(res.msg));
        }
      });
  };

  function request(user) { return { type: userConstants.CREATE_REQUEST, user } }
  function success(user) { return { type: userConstants.CREATE_SUCCESS, user } }
  function failure(error) { return { type: userConstants.CREATE_FAILURE, error } }
}

function getList() {
    return dispatch => {
        dispatch(request());

        userService.getList()
            .then(function(res) {
                if (res.ack == 'ok') {
                    dispatch(success(res.data));
                } else {
                    dispatch(failure(res.msg));
                }
            });
    };

    function request() { return { type: userConstants.GETLIST_REQUEST } }
    function success(users) { return { type: userConstants.GETLIST_SUCCESS, users } }
    function failure(err) { return { type: userConstants.GETLIST_FAILURE, err } }
}

function getOne(id) {
    return dispatch => {
        dispatch(request());

        userService.getOne(id)
            .then(function(res) {
                if (res.ack == 'ok') {
                    dispatch(success(res.data));
                } else {
                    dispatch(failure(res.msg));
                }
            });
    };

    function request() { return { type: userConstants.GETONE_REQUEST } }
    function success(user) { return { type: userConstants.GETONE_SUCCESS, user } }
    function failure(err) { return { type: userConstants.GETONE_FAILURE, err } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return dispatch => {
    dispatch(request(id));

    userService.delete(id)
      .then(function(res) {
        if (res.ack == 'ok') {
          // dispatch(success(res.data));
          dispatch(success(id));
        } else {
          // dispatch(failure(res.msg));
          dispatch(failure(id, res.msg));
        }
      });
  };

  function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
  function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
  function failure(id, err) { return { type: userConstants.DELETE_FAILURE, id, err } }
}