import { userConstants } from '../_constants';

const initialState = {
  selected_user: {
    loading: false,
    err: false,
    user: {}
  },
  list: {
    loading: false,
    err: false,
    items: []
  }
}

export function users(state = initialState, action) {
  switch (action.type) {
    case userConstants.GETONE_REQUEST:
      return {
        ...state,
        selected_user: {
          loading: true
        }
      };
    case userConstants.GETONE_SUCCESS:
      return {
        ...state,
        selected_user: {
          user: action.user
        }
      };
    case userConstants.GETONE_FAILURE:
      return {
        selected_user: {
          err: action.err
        }
      };
    case userConstants.GETLIST_REQUEST:
      return {
        ...state,
        list: {
          loading: true
        }
      };
    case userConstants.GETLIST_SUCCESS:
      return {
        ...state,
        list: {
          items: action.users
        }
      };
    case userConstants.GETLIST_FAILURE:
      return {
        list: {
          err: action.err
        } 
      };
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        list: {
          items:
            state.list.items.map(user =>
              user.id === action.id
                ? { ...user, deleting: true }
                : user

            )
        }
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        ...state,
        list: {
          items: state.list.items.filter(user => user.id !== action.id)
        }
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        list: {
          items: state.list.items.map(user => {
            if (user.id === action.id) {
              // make copy of user without 'deleting:true' property
              const { deleting, ...userCopy } = user;
              // return copy of user with 'deleteError:[error]' property
              return { ...userCopy, deleteError: action.error };
            }

            return user;
          })
        }
      };
    default:
      return state
  }
}
