
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'

import Gmap from './Gmap'
import ItemsList from './ItemsList'

const styles = theme => ({
  map_wrapper: {
    position: `absolute`,
    top: 0,
    left: 0,
    width: `100%`,
    height: `100%`
  }
})

class AlbumMap extends Component {

  render() {
    const { classes, album_id, current_location, album_location, media } = this.props
    let mediaItems = 0

    if (!album_location) { mediaItems++ }
    media.map(m => {
      if (!m.location) { mediaItems++ }
    })

    return (
      <Fragment>
        {current_location &&
          <Fragment>

            <Gmap
              containerElement={<div className={ classes.map_wrapper } />}
              mapElement={<div style={{ height: `100%` }} />}
              album_location={ album_location }
              current_location={ current_location }
              album_id={ album_id }
              media={ media }
            />

            {mediaItems &&
              <ItemsList
                album_id={ album_id }
                current_location={ current_location }
                album_location={ album_location }
                media={ media }
              />
            }

          </Fragment>
        }
      </Fragment>
    )
  }

}

AlbumMap.propTypes = {
  classes: PropTypes.object.isRequired,
  album_id: PropTypes.number.isRequired,
  current_location: PropTypes.object.isRequired,
  album_location: PropTypes.object,
  media: PropTypes.array,
}

AlbumMap.defaultProps = {
  album_location: {},
  media: []
}

function mapStateToProps(state) {
  const { client, admin_albums } = state
  return {
    current_location: client.location,
    album_location: admin_albums.selected_album.album.location,
    media: admin_albums.selected_album.album.media
  }
}

export default connect(mapStateToProps)(withStyles(styles)(AlbumMap))
