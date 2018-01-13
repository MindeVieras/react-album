
import { albumsConstants } from '../../_constants'

const initialState = {
  list: {
    loading: false,
    err: false,
    items: []
  }
}

export function frontAlbums(state = initialState, action) {
  switch (action.type) {
  case albumsConstants.GET_FRONT_LIST_REQUEST:
    return {
      ...state,
      list: {
        loading: true
      }
    }
  case albumsConstants.GET_FRONT_LIST_SUCCESS:
    return {
      ...state,
      list: {
        items: action.albums
      }
    }
  case albumsConstants.GET_FRONT_LIST_FAILURE:
    return {
      list: {
        err: action.err
      } 
    }
  default:
    return state
  }
}
