
import { albumsConstants } from '../_constants'

const initialState = {
  selected_album: {
    loading: false,
    err: false,
    album: {}
  },
  list: {
    loading: false,
    err: false,
    items: []
  }
}

export function albums(state = initialState, action) {
  switch (action.type) {
  case albumsConstants.GETONE_REQUEST:
    return {
      ...state,
      selected_album: {
        loading: true
      }
    }
  case albumsConstants.GETONE_SUCCESS:
    return {
      ...state,
      selected_album: {
        album: action.album
      }
    }
  case albumsConstants.GETONE_FAILURE:
    return {
      selected_album: {
        err: action.err
      }
    }
  case albumsConstants.GETLIST_REQUEST:
    return {
      ...state,
      list: {
        loading: true
      }
    }
  case albumsConstants.GETLIST_SUCCESS:
    return {
      ...state,
      list: {
        items: action.albums
      }
    }
  case albumsConstants.GETLIST_FAILURE:
    return {
      list: {
        err: action.err
      } 
    }
  case albumsConstants.DELETE_REQUEST:
    return {
      ...state,
      list: {
        items:
          state.list.items.map(album =>
            album.id === action.id
              ? { ...album, deleting: true }
              : album

          )
      }
    }
  case albumsConstants.DELETE_SUCCESS:
    return {
      ...state,
      list: {
        items: state.list.items.filter(album => album.id !== action.id)
      }
    }
  case albumsConstants.DELETE_FAILURE:
    return {
      ...state,
      list: {
        items: state.list.items.map(album => {
          if (album.id === action.id) {
            // make copy of album without 'deleting:true' property
            const { deleting, ...albumCopy } = album
            // return copy of album with 'deleteError:[error]' property
            return { ...albumCopy, deleteError: action.error }
          }

          return album
        })
      }
    }
  default:
    return state
  }
}
