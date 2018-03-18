
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'
import ReactTooltip from 'react-tooltip'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'

import { ScaleLoader } from 'react-spinners'
import { IoAperture } from 'react-icons/lib/io'

import { albumsActions } from '../../../../../../_actions'


class StatusRekognitionLabelsIcon extends Component {
  
  constructor(props) {
    super(props)

    this.handleResaveRekognitionLabels = this.handleResaveRekognitionLabels.bind(this)
  }
  
  handleResaveRekognitionLabels(e) {
    const { id, media_id, dispatch } = this.props
    dispatch(albumsActions.saveRekognitionLabels(id, media_id))
  }

  render() {
    
    const tooltipId = uuidv4()
    const contextMenuId = uuidv4()
    const { t } = this.context
    const { id, rekognition_labels } = this.props

    let className = ''
    let tooltipText = ''
    let icon = <ContextMenuTrigger id={ contextMenuId }>
      <IoAperture />
    </ContextMenuTrigger>
    let contextMenu = <ContextMenu id={ contextMenuId }>
      <MenuItem onClick={ this.handleResaveRekognitionLabels }>
        Reset rekognition labels
      </MenuItem>
      <MenuItem>
        Edit rekognition labels
      </MenuItem>
    </ContextMenu>

    if (rekognition_labels.ack == 'ok') {
      className = 'success'
      let totalLabels = Object.keys(rekognition_labels).length - 1, // substract 'ack'
          ulWidth = 150,
          liWidth = 150

      if (totalLabels > 20) {
        ulWidth = 300
      }

      tooltipText = <ul style={{width: `${ulWidth}px`}}>
        {
          Object.keys(rekognition_labels).map((key, i) => {
            if (key != 'ack') {
              let confidence = rekognition_labels[key]
              return (
                <li
                  key={ i }
                  style={{width: `${liWidth}px`, display: `inline-block`}}
                >
                  { t(key) } { Math.trunc(confidence) }%
                </li>
              )
            }
          })
        }
      </ul>
    }
    else if (rekognition_labels.ack == 'loading') {
      className = 'loading'
      tooltipText = rekognition_labels.msg
      icon = <ScaleLoader
        height={ 22 }
        width={ 1 }
        margin={ '1px' }
        color={'#f6f6f5'}
      />
    }
    else if (rekognition_labels.ack == 'err') {
      className = 'failed'
      tooltipText = rekognition_labels.msg
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

StatusRekognitionLabelsIcon.propTypes = {
  id: PropTypes.number.isRequired,
  media_id: PropTypes.number.isRequired,
  rekognition_labels: PropTypes.object.isRequired
}

StatusRekognitionLabelsIcon.contextTypes = {
  t: PropTypes.func
}

export default connect()(StatusRekognitionLabelsIcon)
