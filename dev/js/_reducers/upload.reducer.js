import { uploadConstants } from '../_constants';

const initialState = {
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
    default:
      return state
  }
}
