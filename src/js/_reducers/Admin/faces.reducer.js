
import { facesConstants } from 'Constants'

const initialState = {
  collection: {
    loading: false,
    err: false,
    items: []
  }
}

export function faces(state = initialState, action) {
  switch (action.type) {

  case facesConstants.GET_COLLECTION_REQUEST:
    return {
      ...state,
      collection: {
        loading: true
      }
    }
  case facesConstants.GET_COLLECTION_SUCCESS:
    return {
      ...state,
      collection: {
        items: action.faces
      }
    }
  case facesConstants.GET_COLLECTION_FAILURE:
    return {
      ...state,
      collection: {
        err: action.err
      }
    }
  case facesConstants.DELETE_FACE_REQUEST:
    // add 'deleting:true' property to face being deleted
    return {
      ...state,
      collection: {
        items:
          state.collection.items.map(face =>
            face.FaceId === action.id
              ? { ...face, deleting: true }
              : face

          )
      }
    }
  case facesConstants.DELETE_FACE_SUCCESS:
    // remove deleted face from state
    return {
      ...state,
      collection: {
        items: state.collection.items.filter(face => face.FaceId !== action.id)
      }
    }
  case facesConstants.DELETE_FACE_FAILURE:
    // remove 'deleting:true' property and add 'deleteError:[error]' property to face
    return {
      ...state,
      collection: {
        items: state.collection.items.map(face => {
          if (face.FaceId === action.id) {
            // make copy of face without 'deleting:true' property
            const { deleting, ...faceCopy } = face
            // return copy of face with 'deleteError:[error]' property
            return { ...faceCopy, deleteError: action.error }
          }

          return face
        })
      }
    }
  default:
    return state
  }
}
