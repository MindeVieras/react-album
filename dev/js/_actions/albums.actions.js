import { albumsConstants } from '../_constants';
import { albumsService } from '../_services';
// import { alertActions } from './';
// import { history } from '../_helpers';

export const albumsActions = {
  getList
};

function getList() {
  return dispatch => {
    dispatch(request());

    albumsService.getList()
      .then(function(res) {
        if (res.ack == 'ok') {
          dispatch(success(res.data));
        } else {
          dispatch(failure(res.msg));
        }
      });
  };

  function request() { return { type: albumsConstants.GETLIST_REQUEST } }
  function success(albums) { return { type: albumsConstants.GETLIST_SUCCESS, albums } }
  function failure(err) { return { type: albumsConstants.GETLIST_FAILURE, err } }
}
