import { ActionTypes, Action } from '../actions'
import { IAlbumSelectedProps } from '.'

const initialState: { items: IAlbumSelectedProps[] } = {
  items: [],
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
        items: docs,
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

    case ActionTypes.albumsClear:
      return initialState

    default:
      return state
  }
}
