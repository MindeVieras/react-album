
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import uuidv4 from 'uuid/v4'
import ReactTooltip from 'react-tooltip'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'

import { ScaleLoader } from 'react-spinners'
import { IoClipboard } from 'react-icons/lib/io'

import { albumsActions } from '../../../../../../_actions'


class StatusMetadataIcon extends Component {
  
  constructor() {
    super()

    this.handleResaveMetadata = this.handleResaveMetadata.bind(this)
  }
  
  handleResaveMetadata(e) {
    const { id, media_id, dispatch } = this.props
    dispatch(albumsActions.saveMediaMetadata(id, media_id))
  }

  render() {
    
    const tooltipId = uuidv4()
    const contextMenuId = uuidv4()
    const { t } = this.context
    const { id, metadata } = this.props

    let className = ''
    let tooltipText = ''

    let icon = <ContextMenuTrigger id={ contextMenuId }>
      <IoClipboard />
    </ContextMenuTrigger>

    let contextMenu = <ContextMenu id={ contextMenuId }>
      <MenuItem onClick={ this.handleResaveMetadata }>
        Reset metadata
      </MenuItem>
      <MenuItem>
        Edit metadata
      </MenuItem>
    </ContextMenu>

    if (metadata.ack == 'ok') {
      className = 'success'
      tooltipText = <ul>
        {
          Object.keys(metadata).sort().map((key, i) => {
            if (key != 'ack') {
              let value = metadata[key]
              return (
                <li key={ i }><strong>{ _.startCase(_.toLower(t(key))) }:</strong> { value }</li>
              )
            }
          })
        }
      </ul>
    }
    else if (metadata.ack == 'loading') {
      className = 'loading'
      tooltipText = metadata.msg
      icon = <ScaleLoader
        height={ 22 }
        width={ 1 }
        margin={ '1px' }
        color={'#f6f6f5'}
      />
    }
    else if (metadata.ack == 'err') {
      className = 'failed'
      tooltipText = metadata.msg
    }

    return (
      <span>
        <div
          className={`icon ${className}`}
          data-tip
          data-for={ tooltipId }
        >
          { icon }
          <ReactTooltip id={ tooltipId }>
            { tooltipText }
          </ReactTooltip>
        </div>
        
        { contextMenu }
      
      </span>
    )
  }
}

StatusMetadataIcon.propTypes = {
  id: PropTypes.number.isRequired,
  media_id: PropTypes.number.isRequired,
  metadata: PropTypes.object.isRequired
}

StatusMetadataIcon.contextTypes = {
  t: PropTypes.func
}

export default connect()(StatusMetadataIcon)