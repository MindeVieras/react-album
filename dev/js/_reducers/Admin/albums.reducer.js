
import { albumsConstants } from '../../_constants'

const initialState = {
  lightbox: {
    is_open: false,
    index: 0,
    items: []
  },
  selected_album: {
    album: {},
    map: {
      edit_enabled: false
    },
    locations: {}
  },
  list: {
    loading: false,
    err: false,
    items: []
  },
  dates: {
    loading: false,
    err: false,
    distinct_list: []
  }
}

export function adminAlbums(state = initialState, action) {
  switch (action.type) {
  case albumsConstants.ADD_TO_LIST:
    return {
      ...state,
      list: {
        items: [action.album, ...state.list.items]
      }
    }
  case albumsConstants.RENAME:
    return {
      ...state,
      selected_album: {
        album: {
          ...state.selected_album.album,
          name: action.payload.name
        }
      },
      list: {
        items: state.list.items.map(album => {
          if (album.id === action.payload.id) {
            const { ...albumCopy } = album
            return { ...albumCopy, name: action.payload.name }
          }
          return album
        })
      }
    }
  case albumsConstants.CHANGE_DATE:
    return {
      ...state,
      selected_album: {
        album: {
          ...state.selected_album.album,
          start_date: action.payload.start_date,
          end_date: action.payload.end_date
        }
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
      ...state,
      list: {
        err: action.err
      } 
    }

  case albumsConstants.GETLISTDATES_REQUEST:
    return {
      ...state,
      dates: {
        loading: true
      }
    }
  case albumsConstants.GETLISTDATES_SUCCESS:
    return {
      ...state,
      dates: {
        distinct_list: action.dates
      }
    }
  case albumsConstants.GETLISTDATES_FAILURE:
    return {
      ...state,
      dates: {
        err: action.err
      } 
    }

  case albumsConstants.GETONE_REQUEST:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        album: {
          loading: true
        }
      }
    }
  case albumsConstants.GETONE_SUCCESS:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        album: action.album
      }
    }
  case albumsConstants.GETONE_FAILURE:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        album: {
          err: action.err
        }
      }
    }

  case albumsConstants.CLEAR_SELECTED:
    return {
      ...state,
      selected_album: initialState.selected_album
    }

  // Album locations Map
  case albumsConstants.SET_LOCATIONS_MAP_EDIT:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        map: {
          ...state.selected_album.map,
          edit_enabled: action.edit
        }
      }
    }
  case albumsConstants.SET_LOCATIONS_MAP_CENTER:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        map: {
          ...state.selected_album.map,
          center: action.center
        }
      }
    }
  case albumsConstants.SET_LOCATIONS_MAP_ZOOM:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        map: {
          ...state.selected_album.map,
          zoom: action.zoom
        }
      }
    }



  case albumsConstants.SET_LOCATION:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        album: {
          ...state.selected_album.album,
          location: action.location
        }
      }
    }
  case albumsConstants.REMOVE_LOCATION:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        album: {
          ...state.selected_album.album,
          location: null
        }
      }
    }
  case albumsConstants.SET_MEDIA_LOCATION:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        album: {
          ...state.selected_album.album,
          media: state.selected_album.album.media.map(m => {
            if (m.media_id === action.media_id) {
              const { ...mediaCopy } = m
              return {
                ...mediaCopy,
                location: action.location
              }
            }
            return m
          })
        }
      }
    }
  case albumsConstants.REMOVE_MEDIA_LOCATION:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        album: {
          ...state.selected_album.album,
          media: state.selected_album.album.media.map(m => {
            if (m.media_id === action.media_id) {
              const { ...mediaCopy } = m
              return {
                ...mediaCopy,
                location: null
              }
            }
            return m
          })
        }
      }
    }


  // Delete album
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
      },
      selected_album: {
        ...state.selected_album,
        album: {
          ...state.selected_album.album,
          status: albumsConstants.TRASHED
        }
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

  // Default
  default:
    return state
  }
}
