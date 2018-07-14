
import { trashConstants } from '../../_constants'

const initialState = {
  list: {
    loading: false,
    err: false,
    items: {
      media: [],
      albums: []
    }
  }
}

export function trash(state = initialState, action) {
  switch (action.type) {
  case trashConstants.GETLIST_REQUEST:
    return {
      ...state,
      list: {
        loading: true
      }
    }
  case trashConstants.GETLIST_SUCCESS:
    return {
      ...state,
      list: action.list
    }
  case trashConstants.GETLIST_FAILURE:
    return {
      ...state,
      list: {
        err: action.err
      } 
    }
    
  case trashConstants.RESTORE_REQUEST:
    return {
      ...state,
      list: {
        ...state.list,
        media:
          state.list.media.map(m =>
            m.id === action.id
              ? { ...m, restoring: true }
              : m

          )
      }
    }
  case trashConstants.RESTORE_SUCCESS:
    return {
      ...state,
      list: {
        ...state.list,
        media: state.list.media.filter(m => m.id !== action.id)
      }
    }
  case trashConstants.RESTORE_FAILURE:
    return {
      ...state,
      list: {
        ...state.list,
        media: state.list.media.map(m => {
          if (m.id === action.id) {
            const { restoring, ...mCopy } = m
            return { ...mCopy, restoreError: action.err }
          }

          return m
        })
      }
    }
  case trashConstants.DELETE_REQUEST:
    return {
      ...state,
      list: {
        ...state.list,
        media:
          state.list.media.map(m =>
            m.id === action.id
              ? { ...m, deleting: true }
              : m

          )
      }
    }
  case trashConstants.DELETE_SUCCESS:
    return {
      ...state,
      list: {
        ...state.list,
        media: state.list.media.filter(m => m.id !== action.id)
      }
    }
  case trashConstants.DELETE_FAILURE:
    return {
      ...state,
      list: {
        ...state.list,
        media: state.list.media.map(m => {
          if (m.id === action.id) {
            const { deleting, ...mCopy } = m
            return { ...mCopy, deleteError: action.err }
          }

          return m
        })
      }
    }
  default:
    return state
  }
}