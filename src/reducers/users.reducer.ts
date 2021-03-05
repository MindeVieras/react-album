import { ActionTypes, Action } from '../actions'
import { IUserProps } from '../services'

const initialState = {
  selected: {
    item: {} as IUserProps,
  },
  list: {
    items: [] as IUserProps[],
    pager: {
      total: 0,
      limit: 10,
      offset: 0,
    },
  },
}

export function users(state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.usersGetListRequest:
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
        },
      }
    case ActionTypes.usersGetListSuccess:
      const { docs, ...pager } = action.payload
      return {
        ...state,
        list: {
          items: docs,
          pager: pager,
        },
      }
    case ActionTypes.usersGetListFailure:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
          error: action.payload,
        },
      }

    case ActionTypes.usersAddListItem:
      return {
        ...state,
        list: {
          ...state.list,
          items: [...state.list.items, action.payload],
        },
      }

    // case ActionTypes.usersGetOneRequest:
    //   return {
    //     ...state,
    //     selected_user: {
    //       loading: true,
    //     },
    //   }
    // case ActionTypes.usersGetOneSuccess:
    //   return {
    //     ...state,
    //     selected_user: {
    //       user: action.user,
    //     },
    //   }
    // case ActionTypes.usersGetOneFailure:
    //   return {
    //     selected_user: {
    //       err: action.err,
    //     },
    //   }

    case ActionTypes.usersCreateSuccess:
      return {
        ...state,
        list: {
          items: [action.payload, ...state.list.items.splice(0, state.list.pager.limit - 1)],
          pager: {
            ...state.list.pager,
            offset: 0,
            total: state.list.pager.total + 1
          }
        },
      }

    case ActionTypes.usersDeleteRequest:
      return {
        ...state,
        list: {
          ...state.list,
          items: state.list.items.map((user) => {
            if (action.payload.includes(user.id)) {
              return { ...user, loading: true }
            }
            return user
          }),
        },
      }
    case ActionTypes.usersDeleteSuccess:
      return {
        ...state,
        list: {
          items: state.list.items.filter(item => !action.payload.includes(item.id)),
          pager: {
            ...state.list.pager,
            total: state.list.pager.total - 1
          }
        },
      }
    // case ActionTypes.usersDeleteFailure:
    //   // remove 'deleting:true' property and add 'deleteError:[error]' property to user
    //   return {
    //     ...state,
    //     list: {
    //       items: state.list.items.map((user) => {
    //         if (user.id === action.id) {
    //           // make copy of user without 'deleting:true' property
    //           const { deleting, ...userCopy } = user
    //           // return copy of user with 'deleteError:[error]' property
    //           return { ...userCopy, deleteError: action.error }
    //         }

    //         return user
    //       }),
    //     },
    //   }

    case ActionTypes.usersClear:
      return initialState

    default:
      return state
  }
}
