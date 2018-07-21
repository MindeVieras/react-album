
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import { DragSource } from 'react-dnd'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import blueGrey from '@material-ui/core/colors/blueGrey'

import { IoCheckmarkCircled, IoBug } from 'react-icons/lib/io'

import Thumbnail from './Thumbnail'
import ThumbnailSrv from './ThumbnailSrv'
import ProgressBar from './ProgressBar'
import Status from './Status'
import Filename from './Filename'
import Filesize from './Filesize'
import RemoveButton from './RemoveButton'

import StatusMetadataIcon from '../Icons/StatusMetadata'
import StatusGenerateImageThumbsIcon from '../Icons/StatusGenerateImageThumbs'
import StatusGenerateVideosIcon from '../Icons/StatusGenerateVideos'
import StatusRekognitionLabelsIcon from '../Icons/StatusRekognitionLabels'

import { utilsConstants } from '../../../../../../_constants'
import { albumsActions } from '../../../../../../_actions'

const styles = theme => ({
  item: {
    display: `flex`
  },
  paperRoot: {
    backgroundColor: blueGrey[800],
    position: `relative`
  },
  footer: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit
  },
  statusBar: {
    display: `flex`,
    justifyContent: `space-between`
  },
  icons: {
    display: `flex`
  },
  nameSizeWrapper: {
    display: `flex`,
    justifyContent: `space-between`
  },
  nameSizeText: {
    color: blueGrey[50],
    alignSelf: `flex-end`
  }
})

class MediaItem extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { mime, thumbs, videos, connectDragPreview } = this.props
    if (mime) {
      const img = new Image(25, 25)
      img.onload = () => connectDragPreview(img)
      if (mime.includes('image')) {
        img.src = thumbs.icon
      }
      if (mime.includes('video') && videos) {
        img.src = videos.thumbs.medium
      }
    }
  }

  render() {
    const {
      classes,
      id, media_id,
      status, fromServer,
      mime,
      metadata,
      filename, filesize,
      rekognition_labels,
      thumbs, videos, uploader,
      item_width, item_height,
      gap_width, gap_height,
      connectDragSource
    } = this.props

    // console.log(item_gap)
    let thumb

    let itemStyle = {
      height: item_height,
      width: item_width,
      marginRight: gap_width,
      marginBottom: gap_height
    }

    let footerHeight = 50
    let height = item_height - footerHeight // substract item footer
    if (fromServer) {
      thumb = <ThumbnailSrv
        width={ item_width }
        height={ height }
        mime={ mime }
        videos={ videos }
        thumbs={ thumbs }
        uploader={ uploader }
      />
    }
    else if (mime) {
      thumb = <Thumbnail
        id={ id }
        width={ item_width }
        height={ height }
        mime={ mime }
        videos={ videos }
        uploader={ uploader }
      />
    }

    return connectDragSource(
      <li
        className={ classes.item }
        style={ itemStyle }
      >
        <Paper className={ classes.paperRoot }>
          { thumb }

          <ProgressBar
            id={ id }
            uploader={ uploader }
          />

          <div className={ classes.footer }>
            <div className={ classes.statusBar }>

              <Status
                id={ id }
                uploader={ uploader }
                fromServer={ fromServer }
                className={ classes.nameSizeText }
              />
              <div className={ classes.icons }>
                {mime && rekognition_labels &&
                  <StatusRekognitionLabelsIcon
                    rekognition_labels={ rekognition_labels }
                    mime={ mime }
                    id={ id }
                    media_id={ media_id }
                  />
                }
                {metadata &&
                  <StatusMetadataIcon
                    metadata={ metadata }
                    id={ id }
                    media_id={ media_id }
                  />
                }
                {thumbs &&
                  <StatusGenerateImageThumbsIcon
                    thumbs={ thumbs }
                    id={ id }
                    media_id={ media_id }
                  />
                }
                {videos &&
                  <StatusGenerateVideosIcon videos={ videos } />
                }
                {status === 'upload successful' &&
                  <div
                    className="icon success"
                    data-tip="Successfuly uploaded"
                  >
                    <IoCheckmarkCircled />
                    <ReactTooltip />
                  </div>
                }
                {status === 'upload failed' &&
                  <div
                    className="icon failed"
                    data-tip="Error saving file"
                  >
                    <IoBug />
                    <ReactTooltip />
                  </div>
                }
              </div>
            </div>

            <div className={ classes.nameSizeWrapper }>

              <Filename
                filename={ filename }
                width={ item_width - 90 }
                className={ classes.nameSizeText }
              />

              <Filesize
                filesize={ filesize }
                className={ classes.nameSizeText }
              />

            </div>

          </div>

          {media_id &&
            <RemoveButton
              media_id={ media_id }
            />
          }
        </Paper>

      </li>
    )
  }
}

MediaItem.propTypes = {
  classes: PropTypes.object.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  filename: PropTypes.string,
  filesize: PropTypes.number,
  // media_id: PropTypes.number.isRequired
}

MediaItem.defaultProps = {
  filename: '',
  filesize: 0
}

const boxSource = {
  beginDrag(props) {
    return {
      media_id: props.media_id
    }
  },

  endDrag(props, monitor) {
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()
    if (dropResult) {
      props.dispatch(albumsActions.moveMedia(item.media_id, dropResult.album_id))
    }
  }
}

function dndCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

export default connect()(
  DragSource(
    utilsConstants.DND_MOVE_MEDIA,
    boxSource,
    dndCollect
  )(withStyles(styles)(MediaItem)))
