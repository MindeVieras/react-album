import { uploadConstants } from '../_constants';

const initialState = {}

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
        avatar: action.file
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
