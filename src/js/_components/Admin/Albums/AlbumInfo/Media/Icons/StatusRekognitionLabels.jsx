
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'

import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'

import { ScaleLoader } from 'react-spinners'
import { IoAperture } from 'react-icons/lib/io'

import { Tip } from 'Common'

import { albumsActions } from 'Actions'

const styles = theme => ({
  tipListRoot: {
    display: `flex`,
    justifyContent: `space-between`,
    flexWrap: `wrap`
  },
  tipListItemRoot: {
    display: `flex`,
    justifyContent: `space-between`,
    padding: 0
  }
})

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

    const contextMenuId = uuidv4()
    const { t } = this.context
    const { classes, id, rekognition_labels } = this.props

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

      if (totalLabels > 20 && totalLabels <= 30) {
        ulWidth = 320
      }
      else if (totalLabels > 30) {
        ulWidth = 480
      }

      tooltipText = <List
        disablePadding={ true }
        classes={{ root: classes.tipListRoot }}
        style={{ width: `${ulWidth}px` }}
      >
        {
          Object.keys(rekognition_labels).map((key, i) => {
            if (key != 'ack') {
              let confidence = rekognition_labels[key]
              return (
                <ListItem
                  key={ i }
                  classes={{ root: classes.tipListItemRoot }}
                  style={{ width: `${liWidth}px` }}
                >
                  <Typography variant="body2">{ t(key) }</Typography>
                  <Typography>{ Math.trunc(confidence) }%</Typography>
                </ListItem>
              )
            }
          })
        }
      </List>
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
          data-tip
          data-for={ `tip_album_media_rekognition_labels_${id}` }
          className={`icon ${className}`}
        >
          { icon }
          <Tip id={ `tip_album_media_rekognition_labels_${id}` }>{ tooltipText }</Tip>
        </div>

        { contextMenu }

      </span>
    )
  }
}

StatusRekognitionLabelsIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  media_id: PropTypes.number.isRequired,
  rekognition_labels: PropTypes.object.isRequired
}

StatusRekognitionLabelsIcon.contextTypes = {
  t: PropTypes.func
}

export default connect()(withStyles(styles)(StatusRekognitionLabelsIcon))
