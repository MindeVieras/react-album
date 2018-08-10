
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'

import { ScaleLoader } from 'react-spinners'
import { IoImages } from 'react-icons/lib/io'

import { Tip } from 'Common'

import { albumsActions } from 'Actions'


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

    const { id, thumbs } = this.props

    let className = ''
    let tooltipText = ''

    let icon = <ContextMenuTrigger id={ contextMenuId }>
      <IoImages />
    </ContextMenuTrigger>

    let contextMenu = <ContextMenu id={ contextMenuId }>
      <MenuItem onClick={ this.handleRegenerateThumbs }>
        Regenerate thumbnails
      </MenuItem>
    </ContextMenu>

    if (thumbs.thumb || thumbs.ack == 'ok') {
      className = 'success'
      tooltipText = 'Thumbnails generated'
    }
    else if (thumbs.ack == 'loading') {
      className = 'loading'
      tooltipText = thumbs.msg
      icon = <ScaleLoader
        height={ 22 }
        width={ 1 }
        margin={ '1px' }
        color={'#f6f6f5'}
      />
    }
    else if (thumbs.ack == 'err') {
      className = 'failed'
      tooltipText = thumbs.msg
    }

    return (
      <span>
        <div
          data-tip
          data-for={ `tip_album_image_thumb_generate_${id}` }
          className={`icon ${className}`}
        >
          { icon }
          <Tip id={ `tip_album_image_thumb_generate_${id}` }>{ tooltipText }</Tip>
        </div>

        { contextMenu }

      </span>
    )
  }
}

StatusGenerateImageThumbsIcon.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  media_id: PropTypes.number.isRequired,
  thumbs: PropTypes.object.isRequired
}

export default connect()(StatusGenerateImageThumbsIcon)
