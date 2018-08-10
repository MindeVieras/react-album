
import { albumsConstants } from 'Constants'

const initialState = {
  selected_album: {
    album: {},
    map: {
      edit_enabled: false
    },
    pager: {
      current_page: 0,
      cols: 1,
      rows: 1,
      per_page: 1
    }
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

  /*
   * Album list reducers
   * calls GET_LIST_REQUEST, GET_LIST_SUCCESS, GET_LIST_FAILURE
   *       ADD_TO_LIST
   */

  case albumsConstants.GET_LIST_REQUEST:
    return {
      ...state,
      list: {
        loading: true
      }
    }
  case albumsConstants.GET_LIST_SUCCESS:
    return {
      ...state,
      list: {
        items: action.albums
      }
    }
  case albumsConstants.GET_LIST_FAILURE:
    return {
      ...state,
      list: {
        err: action.err
      }
    }
  case albumsConstants.ADD_TO_LIST:
    return {
      ...state,
      list: {
        items: [action.album, ...state.list.items]
      }
    }

  /*
   * Album list dates reducers
   * calls GET_LIST_DATES_REQUEST, GET_LIST_DATES_SUCCESS, GET_LIST_DATES_FAILURE
   */

  case albumsConstants.GET_LIST_DATES_REQUEST:
    return {
      ...state,
      dates: {
        loading: true
      }
    }
  case albumsConstants.GET_LIST_DATES_SUCCESS:
    return {
      ...state,
      dates: {
        distinct_list: action.dates
      }
    }
  case albumsConstants.GET_LIST_DATES_FAILURE:
    return {
      ...state,
      dates: {
        err: action.err
      }
    }


  /*
   * Album get one reducers
   * calls GET_ONE_REQUEST, GET_ONE_SUCCESS, GET_ONE_FAILURE
   */

  case albumsConstants.GET_ONE_REQUEST:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        album: {
          loading: true
        }
      }
    }
  case albumsConstants.GET_ONE_SUCCESS:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        album: action.album
      }
    }
  case albumsConstants.GET_ONE_FAILURE:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        album: {
          err: action.err
        }
      }
    }


  /*
   * Album data reducers
   * calls RENAME, CHANGE_DATE
   */

  case albumsConstants.RENAME:
    return {
      ...state,
      selected_album: {
        album: {
          ...state.selected_album.album,
          name: action.payload.name
        }
      },
      // Also rename album in list
      list: {
        items: state.list.items.map(album => {
          if (album.id === action.payload.album_id) {
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
      },
      // Also change album date in list
      list: {
        items: state.list.items.map(album => {
          if (album.id === action.payload.album_id) {
            const { ...albumCopy } = album
            return {
              ...albumCopy,
              start_date: action.payload.start_date,
              end_date: action.payload.end_date
            }
          }
          return album
        })
      }
    }


  /*
   * Album locations map reducers
   * calls SET_LOCATIONS_MAP_EDIT, SET_LOCATIONS_MAP_CENTER, SET_LOCATIONS_MAP_ZOOM
   */

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


  /*
   * Album location reducers
   * calls SET_LOCATION, REMOVE_LOCATION
   */

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


  /*
   * Album Media reducers
   * calls SUBMIT_MEDIA, SET_MEDIA_DATA, SET_MEDIA_PHASE
   *       SET_MEDIA_MEDIA_ID
   *       REMOVE_MEDIA
   */

  case albumsConstants.SUBMIT_MEDIA:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        album: {
          ...state.selected_album.album,
          media: [
            ...state.selected_album.album.media,
            {
              id: action.id,
              phase: action.phase,
              fromServer: action.fromServer
            }
          ]
        }
      }
    }
  case albumsConstants.SET_MEDIA_DATA:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        album: {
          ...state.selected_album.album,
          media: state.selected_album.album.media.map(m => {
            if (m.id === action.id) {
              const { ...mCopy } = m
              return {
                ...mCopy,
                filename: action.data.filename,
                filesize: action.data.size,
                mime: action.data.mime
              }
            }
            return m
          })
        }
      }
    }
  case albumsConstants.SET_MEDIA_PHASE:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        album: {
          ...state.selected_album.album,
          media: state.selected_album.album.media.map(m => {
            if (m.id === action.id) {
              const { ...mCopy } = m
              return {
                ...mCopy,
                phase: action.phase
              }
            }
            return m
          })
        }
      }
    }
  case albumsConstants.SET_MEDIA_MEDIA_ID:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        album: {
          ...state.selected_album.album,
          media: state.selected_album.album.media.map(m => {
            if (m.id === action.id) {
              const { ...mCopy } = m
              return {
                ...mCopy,
                media_id: action.media_id
              }
            }
            return m
          })
        }
      }
    }
  case albumsConstants.REMOVE_MEDIA_ONE:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        album: {
          ...state.selected_album.album,
          media: state.selected_album.album.media.filter(m => m.media_id != action.media_id)
        }
      }
    }
  case albumsConstants.CLEAR_MEDIA:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        album: {
          ...state.selected_album.album,
          media: []
        }
      }
    }

  /*
   * Album Media meta reducers
   * calls SAVE_MEDIA_METADATA_REQUEST, SAVE_MEDIA_METADATA_SUCCESS, SAVE_MEDIA_METADATA_FAILURE
   *       SAVE_MEDIA_REKOGNITION_LABELS_REQUEST, SAVE_MEDIA_REKOGNITION_LABELS_SUCCESS, SAVE_MEDIA_REKOGNITION_LABELS_FAILURE
   */

  case albumsConstants.SAVE_MEDIA_METADATA_REQUEST:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        album: {
          ...state.selected_album.album,
          media: state.selected_album.album.media.map(m => {
            if (m.id === action.id) {
              const { ...mCopy } = m
              return {
                ...mCopy,
                metadata: { ack: 'loading', msg: 'Metadata processing...' }
              }
            }
            return m
          })
        }
      }
    }
  case albumsConstants.SAVE_MEDIA_METADATA_SUCCESS:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        album: {
          ...state.selected_album.album,
          media: state.selected_album.album.media.map(m => {
            if (m.id === action.id) {
              const { ...mCopy } = m
              return {
                ...mCopy,
                metadata: { ack: 'ok', ...action.metadata }
              }
            }
            return m
          })
        }
      }
    }
  case albumsConstants.SAVE_MEDIA_METADATA_FAILURE:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        album: {
          ...state.selected_album.album,
          media: state.selected_album.album.media.map(m => {
            if (m.id === action.id) {
              const { ...mCopy } = m
              return {
                ...mCopy,
                metadata: { ack: 'err', msg: action.err }
              }
            }
            return m
          })
        }
      }
    }
  case albumsConstants.SAVE_MEDIA_REKOGNITION_LABELS_REQUEST:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        album: {
          ...state.selected_album.album,
          media: state.selected_album.album.media.map(m => {
            if (m.id === action.id) {
              const { ...mCopy } = m
              return {
                ...mCopy,
                rekognition_labels: { ack: 'loading', msg: 'Rekognition labels processing...' }
              }
            }
            return m
          })
        }
      }
    }
  case albumsConstants.SAVE_MEDIA_REKOGNITION_LABELS_SUCCESS:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        album: {
          ...state.selected_album.album,
          media: state.selected_album.album.media.map(m => {
            if (m.id === action.id) {
              const { ...mCopy } = m
              return {
                ...mCopy,
                rekognition_labels: { ack: 'ok', ...action.rekognition_labels }
              }
            }
            return m
          })
        }
      }
    }
  case albumsConstants.SAVE_MEDIA_REKOGNITION_LABELS_FAILURE:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        album: {
          ...state.selected_album.album,
          media: state.selected_album.album.media.map(m => {
            if (m.id === action.id) {
              const { ...mCopy } = m
              return {
                ...mCopy,
                rekognition_labels: { ack: 'err', msg: action.err }
              }
            }
            return m
          })
        }
      }
    }


  /*
   * Album Media image/video styles reducers
   * calls GENERATE_IMG_THUMBS_REQUEST, GENERATE_IMG_THUMBS_SUCCESS, GENERATE_IMG_THUMBS_FAILURE
   *       GENERATE_VIDEOS_REQUEST, GENERATE_VIDEOS_SUCCESS, GENERATE_VIDEOS_FAILURE
   */

  case albumsConstants.GENERATE_IMG_THUMBS_REQUEST:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        album: {
          ...state.selected_album.album,
          media: state.selected_album.album.media.map(m => {
            if (m.id === action.id) {
              const { ...mCopy } = m
              return {
                ...mCopy,
                thumbs: { ack: 'loading', msg: 'Generating images thumbnails...' }
              }
            }
            return m
          })
        }
      }
    }
  case albumsConstants.GENERATE_IMG_THUMBS_SUCCESS:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        album: {
          ...state.selected_album.album,
          media: state.selected_album.album.media.map(m => {
            if (m.id === action.id) {
              const { ...mCopy } = m
              return {
                ...mCopy,
                thumbs: { ack: 'ok' }
              }
            }
            return m
          })
        }
      }
    }
  case albumsConstants.GENERATE_IMG_THUMBS_FAILURE:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        album: {
          ...state.selected_album.album,
          media: state.selected_album.album.media.map(m => {
            if (m.id === action.id) {
              const { ...mCopy } = m
              return {
                ...mCopy,
                thumbs: { ack: 'err', msg: action.err }
              }
            }
            return m
          })
        }
      }
    }
  case albumsConstants.GENERATE_VIDEOS_REQUEST:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        album: {
          ...state.selected_album.album,
          media: state.selected_album.album.media.map(m => {
            if (m.id === action.id) {
              const { ...mCopy } = m
              return {
                ...mCopy,
                videos: { ack: 'loading', msg: 'Generating videos...' }
              }
            }
            return m
          })
        }
      }
    }
  case albumsConstants.GENERATE_VIDEOS_SUCCESS:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        album: {
          ...state.selected_album.album,
          media: state.selected_album.album.media.map(m => {
            if (m.id === action.id) {
              const { ...mCopy } = m
              return {
                ...mCopy,
                videos: action.videos
              }
            }
            return m
          })
        }
      }
    }
  case albumsConstants.GENERATE_VIDEOS_FAILURE:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        album: {
          ...state.selected_album.album,
          media: state.selected_album.album.media.map(m => {
            if (m.id === action.id) {
              const { ...mCopy } = m
              return {
                ...mCopy,
                videos: { ack: 'err', msg: action.err }
              }
            }
            return m
          })
        }
      }
    }

  /*
   * Album Media location reducers
   * calls SET_MEDIA_LOCATION, REMOVE_MEDIA_LOCATION
   *       OPEN_MEDIA_LOCATION_MARKER, CLOSE_MEDIA_LOCATION_MARKERS
   */

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
  case albumsConstants.OPEN_MEDIA_LOCATION_MARKER:
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
                marker_open: action.marker_open
              }
            }
            return m
          })
        }
      }
    }
  case albumsConstants.CLOSE_MEDIA_LOCATION_MARKERS:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        album: {
          ...state.selected_album.album,
          media: state.selected_album.album.media.map(m => {
            const { ...mediaCopy } = m
            return {
              ...mediaCopy,
              marker_open: false
            }
          })
        }
      }
    }



    // Unsorted reducers...


  /*
   * Album Media pager reducers
   * calls SET_MEDIA_PAGER_PAGE
   *       SET_MEDIA_PAGER_GRID
   */

  case albumsConstants.SET_MEDIA_PAGER_PAGE:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        pager: {
          ...state.selected_album.pager,
          current_page: action.page
        }
      }
    }
  case albumsConstants.SET_MEDIA_PAGER_GRID:
    return {
      ...state,
      selected_album: {
        ...state.selected_album,
        pager: {
          ...state.selected_album.pager,
          current_page: 0,
          cols: action.cols,
          rows: action.rows,
          per_page: action.cols * action.rows
        }
      }
    }




  case albumsConstants.CLEAR_SELECTED:
    return {
      ...state,
      selected_album: initialState.selected_album
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
