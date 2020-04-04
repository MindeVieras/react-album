import { ActionTypes, Action } from '../actions'
import { IAlbumProps } from '../services'

const initialState = {
  selected: {
    item: {} as IAlbumProps,
  },
  list: {
    items: [] as IAlbumProps[],
    pager: {
      total: 0,
      limit: 10,
      offset: 0,
    },
  },
}

export function albums(state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.albumsGetListRequest:
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
        },
      }
    case ActionTypes.albumsGetListSuccess:
      const { docs, ...pager } = action.payload
      return {
        ...state,
        list: {
          items: docs,
          pager: pager,
        },
      }
    case ActionTypes.albumsGetListFailure:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
          error: action.payload,
        },
      }

    case ActionTypes.albumsClear:
      return initialState

    default:
      return state
  }
}
