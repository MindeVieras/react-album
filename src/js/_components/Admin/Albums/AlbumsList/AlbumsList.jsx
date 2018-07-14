
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { RingLoader } from 'react-spinners'

import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'

import Bar from './Bar'
import ListItem from './ListItem'
import Scrollbar from '../../../Common/Scrollbar'

import { albumsActions, utilsActions } from '../../../../_actions'

const styles = theme => ({
  // scrollbar: {
  //   display: `flex`,
  //   overflow: `hidden`
  // }
})

class AlbumsList extends Component {

  componentDidMount(){
    const { start_date, end_date, dispatch } = this.props
    dispatch(albumsActions.getList(start_date, end_date))
  }

  onAlbumSelect(album_id) {
    const { dispatch } = this.props
    dispatch(albumsActions.clearMedia())
    dispatch(albumsActions.getOne(album_id))
    dispatch(utilsActions.saveAdminSetting('selected_album', album_id))
  }

  render() {
    const { classes, selected_album_id, albums } = this.props

    if (albums) {
      return (
        <Fragment>
          <Bar />
          {albums.loading &&
            <RingLoader />
          }
          {albums.err &&
            <div>{albums.err}</div>
          }
          {albums.items &&
            <Scrollbar position="left">
              <List disablePadding={ true }>
                {albums.items.map((album) =>
                  <ListItem
                    key={ album.id }
                    active={ selected_album_id === album.id }
                    album_id={ album.id }
                    name={ album.name }
                    start_date={ album.start_date }
                    onItemClick={(album_id) => this.onAlbumSelect(album_id)}
                  />
                )}
              </List>
            </Scrollbar>
          }
        </Fragment>
      )
    }
    else {
      return <span>No albums</span>
    }
  }
}

AlbumsList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  selected_album_id: PropTypes.number.isRequired,
  albums: PropTypes.object
}

AlbumsList.defaultProps = {
  albums: {}
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

export default connect(mapStateToProps)(withStyles(styles)(AlbumsList))
