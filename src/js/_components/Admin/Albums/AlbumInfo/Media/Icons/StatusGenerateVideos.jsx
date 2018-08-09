
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'

import { ScaleLoader } from 'react-spinners'
import { IoVideocamera } from 'react-icons/lib/io'

import { Tip } from 'Common'

import { albumsActions } from '../../../../../../_actions'


class StatusGenerateVideosIcon extends Component {

  constructor() {
    super()

    this.handleRegenerateVideos = this.handleRegenerateVideos.bind(this)
  }

  handleRegenerateVideos() {
    const { id, media_id, dispatch } = this.props
    dispatch(albumsActions.generateVideos(id, media_id))
  }

  render() {

    const contextMenuId = uuidv4()

    const { id, videos } = this.props

    let className = ''
    let tooltipText = ''

    let icon = <ContextMenuTrigger id={ contextMenuId }>
      <IoVideocamera />
    </ContextMenuTrigger>

    let contextMenu = <ContextMenu id={ contextMenuId }>
      <MenuItem onClick={ this.handleRegenerateVideos }>
        Regenerate videos
      </MenuItem>
    </ContextMenu>

    if (videos.video || videos.ack == 'ok') {
      className = 'success'
      tooltipText = 'Videos generated'
    }
    else if (videos.ack == 'loading') {
      className = 'loading'
      tooltipText = videos.msg
      icon = <ScaleLoader
        height={ 22 }
        width={ 1 }
        margin={ '1px' }
        color={'#f6f6f5'}
      />
    }
    else if (videos.ack == 'err') {
      className = 'failed'
      tooltipText = videos.msg
    }

    return (
      <span>
        <div
          data-tip
          data-for={ `tip_album_videos_generate_${id}` }
          className={`icon ${className}`}
        >
          { icon }
          <Tip id={ `tip_album_videos_generate_${id}` }>{ tooltipText }</Tip>
        </div>

        { contextMenu }

      </span>
    )
  }
}

StatusGenerateVideosIcon.propTypes = {
  id: PropTypes.number.isRequired,
  media_id: PropTypes.number.isRequired,
  videos: PropTypes.object.isRequired
}

export default connect()(StatusGenerateVideosIcon)

