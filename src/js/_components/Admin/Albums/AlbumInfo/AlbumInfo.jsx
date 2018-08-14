
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'

import { Spinner } from 'Common'
import DeleteAlbum from '../../Buttons/DeleteAlbum'
import Bar from './Bar'
import Media from './Media'

import { headerActions } from 'Actions'
import { albumsConstants, contentConstants, mediaConstants } from 'Constants'

const styles = theme => ({
  info_wrapper: {
    position: `absolute`,
    top: 0,
    right: 0,
    bottom: 0,
    display: `flex`,
    flexDirection: `column`
  },
  flex: {
    display: `flex`,
    flex: 1,
    overflow: `auto`
  }
})

class AlbumInfo extends Component {

  componentWillReceiveProps(nextProps) {
    const { selected_album, dispatch } = nextProps
    if (selected_album) {
      const { id, name, media, status } = selected_album
      dispatch(headerActions.setTitle(name))
    }
  }

  render() {
    const { classes, width, height, selected_album } = this.props

    let wrapper_height = height - 30 // substract infoBar height

    return (
      <div className={ classes.info_wrapper } style={{ width: `${width}px` }}>
        {selected_album.loading &&
          <Spinner type="primary" size={ 70 } />
        }
        {selected_album.err &&
          <div>{selected_album.err}</div>
        }
        {selected_album.id &&
          <Fragment>
            <div className={ classes.flex }>
              <Media
                entity={contentConstants.TYPE_ALBUM}
                entity_id={selected_album.id}
                status={mediaConstants.STATUS_ENABLED}
                files={ selected_album.media }
                wrapper_width={ width }
                wrapper_height={ wrapper_height }
              />
            </div>
            <Bar
              album_id={ selected_album.id }
              start_date={ selected_album.start_date }
              end_date={ selected_album.end_date }
              counter={ selected_album.total_media }
              total_filesize={ selected_album.total_filesize }
            />

            <DeleteAlbum
              id={ selected_album.id }
              name={ selected_album.name }
            />

          </Fragment>
        }

      </div>
    )
  }
}

AlbumInfo.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  selected_album: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
}

function mapStateToProps(state) {
  const { admin_albums } = state
  return {
    selected_album: admin_albums.selected_album.album
  }
}

export default connect(mapStateToProps)(withStyles(styles)(AlbumInfo))
