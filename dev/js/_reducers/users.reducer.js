import { userConstants } from '../_constants';

// const initialState = {
//   users: {items:[]}
// };

export function userCreation(state = {}, action) {
  switch (action.type) {
    case userConstants.CREATE_REQUEST:
      return { creating: true };
    case userConstants.CREATE_SUCCESS:
      return {};
    case userConstants.CREATE_FAILURE:
      return {};
    default:
      return state
  }
}

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

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETLIST_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETLIST_SUCCESS:
      return {
        items: action.users
      };
    case userConstants.GETLIST_FAILURE:
      return { 
        err: action.err
      };
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
    default:
      return state
  }
}
