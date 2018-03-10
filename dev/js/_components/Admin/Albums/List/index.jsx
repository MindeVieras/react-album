
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { RingLoader } from 'react-spinners'

import Bar from './Bar'
import ListItem from './ListItem'

import { headerActions, albumsActions, uploaderActions, utilsActions } from '../../../../_actions'

class AlbumsList extends Component {

  componentDidMount(){
    const { start_date, end_date, dispatch } = this.props
    dispatch(albumsActions.getList(start_date, end_date))
  }

  onAlbumSelect(album_id) {
    const { dispatch } = this.props
    dispatch(uploaderActions.clearFiles())
    dispatch(albumsActions.getOne(album_id))
    dispatch(utilsActions.saveAdminSetting('selected_album', album_id))
  }

  render() {
    const { selected_album_id, albums, width } = this.props
    const scrollbarOptions = {
      wheelSpeed: 1.25,
      // useBothWheelAxes: true
    }
    if (albums) {
      return (
        <div className="albums-list">
          <Bar />
          {albums.loading &&
            <RingLoader />
          }
          {albums.err &&
            <div>{albums.err}</div>
          }
          {albums.items &&
            <PerfectScrollbar
              option={ scrollbarOptions }
              className="album-scrollbar left-scrollbar default-scrollbar"
            >
              <ul>
                {albums.items.map((album) =>
                  <ListItem
                    key={ album.id }
                    active={ selected_album_id === album.id }
                    album_id={ album.id }
                    name={ album.name }
                    start_date={ album.start_date }
                    width={ width }
                    onItemClick={(album_id) => this.onAlbumSelect(album_id)}
                  />
                )}
              </ul>
            </PerfectScrollbar>
          }
        </div>
      )
    }
    else {
      return <span>No albums</span>
    }
  }
}

AlbumsList.propTypes = {
  albums: PropTypes.object,
  selected_album_id: PropTypes.number.isRequired,
  width: PropTypes.number
}

AlbumsList.defaultProps = {
  width: 200
}

function mapStateToProps(state) {
  const { settings, admin_albums } = state
  return {
    albums: admin_albums.list,
    selected_album_id: parseInt(settings.admin.selected_album),
    start_date: settings.admin.list_filter_start_date,
    end_date: settings.admin.list_filter_end_date
  }
}

export default connect(mapStateToProps)(AlbumsList)
