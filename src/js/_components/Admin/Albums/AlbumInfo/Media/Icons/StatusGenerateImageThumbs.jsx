
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'
import classNames from 'classnames'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'

import { withStyles } from '@material-ui/core/styles'

import CollectionsIcon from '@material-ui/icons/Collections'

import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'

import { ScaleLoader } from 'react-spinners'

import { Tip } from 'Common'

import { albumsActions } from 'Actions'

const styles = theme => ({
  iconSuccess: {
    color: green[700]
  },
  iconError: {
    color: red[700]
  }
})

class StatusGenerateImageThumbsIcon extends Component {

  constructor() {
    super()

    this.handleRegenerateThumbs = this.handleRegenerateThumbs.bind(this)
  }

  handleRegenerateThumbs() {
    const { id, media_id, dispatch } = this.props
    dispatch(albumsActions.generateImageThumbs(id, media_id))
  }

  render() {

    const contextMenuId = uuidv4()

    const { classes, className, id, thumbs } = this.props

    let tooltipText = ''

    let icon = <ContextMenuTrigger id={ contextMenuId }>
      <CollectionsIcon
        className={classNames(
          className,
          { [classes.iconSuccess]: thumbs.ack == 'ok' || true },
          { [classes.iconError]: thumbs.ack == 'err' }
        )}
      />
    </ContextMenuTrigger>

    let contextMenu = <ContextMenu id={ contextMenuId }>
      <MenuItem onClick={ this.handleRegenerateThumbs }>
        Regenerate thumbnails
      </MenuItem>
    </ContextMenu>

    if (thumbs.thumb || thumbs.ack == 'ok') {
      tooltipText = 'Thumbnails generated'
    }
    else if (thumbs.ack == 'loading') {
      tooltipText = thumbs.msg
      icon = <ScaleLoader
        height={ 22 }
        width={ 1 }
        margin={ '1px' }
        color={'#f6f6f5'}
      />
    }
    else if (thumbs.ack == 'err') {
      tooltipText = thumbs.msg
    }

    return (
      <Fragment>
        <div
          data-tip
          data-for={ `tip_album_image_thumb_generate_${id}` }
        >
          { icon }
          <Tip id={ `tip_album_image_thumb_generate_${id}` }>{ tooltipText }</Tip>
        </div>

        { contextMenu }

      </Fragment>
    )
  }
}

StatusGenerateImageThumbsIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  media_id: PropTypes.number.isRequired,
  thumbs: PropTypes.object.isRequired,
  className: PropTypes.string
}

StatusGenerateImageThumbsIcon.defaultProps = {
  className: null
}

export default connect()(withStyles(styles)(StatusGenerateImageThumbsIcon))
