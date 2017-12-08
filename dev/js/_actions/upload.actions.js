import { uploadConstants } from '../_constants';
import { uploadService } from '../_services';
import { alertActions } from './';

export const uploadActions = {
  avatar,
  album_media
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

function album_media(files, author, ct, status) {
  return dispatch => {
    // console.log(ct);
    dispatch(request());
    // var rows = [];
    for (var i = 0; i < files.length; i++) {
      
      let file = files[i];

      // Upload file to S3 and save to DB
      uploadService.upload(file, author, ct, status)
        .then(function(res) {
          // console.log(res);
          if (res.ack == 'ok') {
            dispatch(success(res.data));
          } else {
            // dispatch(failure(res.msg));
          }
        });
      // console.log(file.name);
      // rows.push(file);
    }
  };

  function request() { return { type: uploadConstants.ALBUM_MEDIA_REQUEST } }
  function success(file) { return { type: uploadConstants.ALBUM_MEDIA_SUCCESS, file } }
  // function failure(err) { return { type: uploadConstants.AVATAR_FAILURE, err } }
}
