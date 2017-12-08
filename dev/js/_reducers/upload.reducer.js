
import { uploadConstants } from '../_constants';

const initialState = {
  album_media: {
    uploading: false,
    media: []
  },
  avatar: {
    uploading: false,
    err: false,
    success: false,
    media_file: {}
  }
}

export function upload(state = initialState, action) {
  switch (action.type) {
  case uploadConstants.AVATAR_REQUEST:
    return {
      avatar: {
        uploading: true
      }
    };
  case uploadConstants.AVATAR_SUCCESS:
    return {
      avatar: {
        success: true,
        media_file: action.file
      }
    };
  case uploadConstants.AVATAR_FAILURE:
    return {
      avatar: {
        err: action.err
      }
    };
  case uploadConstants.ALBUM_MEDIA_REQUEST:
    return {
      ...state,
      album_media: {
        uploading: true
      }
    };
  case uploadConstants.ALBUM_MEDIA_SUCCESS:
    console.log(action.file);
    return {
      ...state,
      album_media: {
        success: true,
        media: [state.album_media.media, action.file]
      }
    };
  case uploadConstants.ALBUM_MEDIA_FAILURE:
    return {
      ...state,
      album_media: {
        err: action.err
      }
    };
  default:
    return state
  }
}
