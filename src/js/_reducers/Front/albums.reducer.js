
import { frontConstants } from 'Constants'

const initialState = {
  list: {
    loading: false,
    err: false,
    items: []
  }
}

export function frontAlbums(state = initialState, action) {
  switch (action.type) {
  case frontConstants.GETLIST_REQUEST:
    return {
      ...state,
      list: {
        loading: true
      }
    }
  case frontConstants.GETLIST_SUCCESS:
    return {
      ...state,
      list: {
        items: action.albums
      }
    }
  case frontConstants.GETLIST_LOAD_MORE:
    return {
      ...state,
      list: {
        items: [ ...state.list.items, ...action.albums ]
      }
    }
  case frontConstants.GETLIST_FAILURE:
    return {
      list: {
        err: action.err
      }
    }
  default:
    return state
  }
}
