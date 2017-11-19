import { userConstants } from '../_constants';

export function userGetOne(state = {}, action) {
  switch (action.type) {
    case userConstants.GETONE_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETONE_SUCCESS:
      return {
        user: action.user
      };
    case userConstants.GETONE_FAILURE:
      return { 
        err: action.err
      };
    default:
      return state
  }
}

const initialState = {
  list: {
    loading: false,
    err: false,
    items: []
  }
}

export function users(state = initialState, action) {
  switch (action.type) {
    case userConstants.GETLIST_REQUEST:
      return {
        list: {
          loading: true
        }
      };
    case userConstants.GETLIST_SUCCESS:
      return {
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
        // ...state,
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
        list: {
          items: state.list.items.filter(user => user.id !== action.id)
        }
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        // ...state,
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
