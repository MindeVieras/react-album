import { ActionTypes, Action } from '../actions'
import { IAlbumSelectedProps } from '.'
import { IMediaSubmitProps } from '../services'

const initialState: { items: IAlbumSelectedProps[] } = {
  items: [],
}

/**
 * Get selected album id from local storage.
 */
let selectedAlbum = localStorage.getItem('selectedAlbum')
if (selectedAlbum) {
  selectedAlbum = JSON.parse(selectedAlbum)
}

export function albums(state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.albumsGetListRequest:
      return {
        ...state,
        loading: true,
      }
    case ActionTypes.albumsGetListSuccess:
      const { docs } = action.payload
      return {
        items: docs.map((a) => {
          // Make sure to set selected album from local storage.
          if (a.id === selectedAlbum) {
            return {
              ...a,
              selected: true,
            }
          }
          return a
        }),
      }
    case ActionTypes.albumsGetListFailure:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case ActionTypes.albumsGetOneRequest:
      return {
        ...state,
        items: state.items.map((a) => {
          if (a.id === action.payload) {
            const { ...aCopy } = a
            return {
              ...aCopy,
              loading: true,
            }
          }
          return a
        }),
      }
    case ActionTypes.albumsGetOneSuccess:
      return {
        ...state,
        items: state.items.map((a) => {
          if (a.id === action.payload.id) {
            const { loading, ...aCopy } = a
            return {
              ...aCopy,
              ...action.payload.data,
              isLoaded: true,
            }
          }
          return a
        }),
      }
    case ActionTypes.albumsGetOneFailure:
      return {
        ...state,
        items: state.items.map((a) => {
          if (a.id === action.payload.id) {
            const { loading, ...aCopy } = a
            return {
              ...aCopy,
              error: action.payload.message,
            }
          }
          return a
        }),
      }

    case ActionTypes.albumsSelect:
      return {
        ...state,
        items: state.items.map((a) => {
          if (a.id === action.payload) {
            const { ...aCopy } = a
            return {
              ...aCopy,
              selected: true,
            }
          }
          delete a.selected
          return a
        }),
      }

    case ActionTypes.mediaSubmit:
      return {
        ...state,
        items: state.items.map((a) => {
          if (a.id === action.payload.album) {
            const { media, ...aCopy } = a
            return {
              ...aCopy,
              media: [...media, action.payload],
            }
          }
          return a
        }),
      }

    case ActionTypes.mediaRemoveRequest:
      return {
        ...state,
        items: state.items.map((a) => {
          return {
            ...a,
            media: a.media?.map((m) => {
              if (m.id === action.payload) {
                return {
                  ...m,
                  loading: true,
                }
              }
              return m
            }),
          }
        }),
      }

    case ActionTypes.mediaRemoveSuccess:
      return {
        ...state,
        items: state.items.map((a) => {
          return {
            ...a,
            media: a.media?.filter((m) => m.id !== action.payload),
          }
        }),
      }

    case ActionTypes.mediaRemoveFailure:
      return {
        ...state,
        items: state.items.map((a) => {
          return {
            ...a,
            media: a.media?.map((m) => {
              if (m.id === action.payload.id) {
                return {
                  ...m,
                  loading: false,
                  error: action.payload.message,
                }
              }
              return m
            }),
          }
        }),
      }

    case ActionTypes.mediaSetProgress:
      return {
        ...state,
        items: state.items.map((a) => {
          return {
            ...a,
            media: a.media?.map((m) => {
              if (m.isUppy && m.id === action.payload.id) {
                const { progress, ...mCopy } = m as IMediaSubmitProps
                return {
                  ...mCopy,
                  progress: action.payload.progress,
                }
              }
              return m
            }),
          }
        }),
      }

    case ActionTypes.mediaCreate:
      return {
        ...state,
        items: state.items.map((a) => {
          return {
            ...a,
            media: a.media?.map((m) => {
              if (m.isUppy && m.id === action.payload.id) {
                return action.payload.item
              }
              return m
            }),
          }
        }),
      }

    case ActionTypes.albumsClear:
      return initialState

    default:
      return state
  }
}
