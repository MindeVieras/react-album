import { uploadConstants } from '../_constants';
import { uploadService, mediaService } from '../_services';
import { alertActions } from './';

export const uploadActions = {
  avatar
};

function avatar(file, author, ct, status) {
  return dispatch => {
    dispatch(request());
    // Upload file to S3 and save to DB
    uploadService.upload(file, author, ct, status)
      .then(function(res) {
        if (res.ack == 'ok') {
          dispatch(success(res.data));
        } else {
          dispatch(failure(res.msg));
        }
    });
  };

  function request() { return { type: uploadConstants.AVATAR_REQUEST } }
  function success(file) { return { type: uploadConstants.AVATAR_SUCCESS, file } }
  function failure(err) { return { type: uploadConstants.AVATAR_FAILURE, err } }
}
