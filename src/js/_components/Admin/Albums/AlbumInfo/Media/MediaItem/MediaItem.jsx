
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

import { fitMediaToWrapper } from '../../../../../../_helpers'
import { utilsConstants } from '../../../../../../_constants'
import { albumsActions, adminUiActions } from '../../../../../../_actions'

const styles = theme => ({
  item: {
    display: `flex`
  },
  paperRoot: {
    backgroundColor: blueGrey[800],
    position: `relative`
  },
  thumbWrapper: {
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`
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

  openLightbox(id) {
    this.props.dispatch(adminUiActions.lightboxOpen(id))
  }

  render() {

    const {
      classes, uploader, connectDragSource,
      item_width, item_height, gap_width, gap_height,
      id, media_id,
      status, fromServer,
      mime, filename, filesize,
      metadata, rekognition_labels,
      thumbs, videos
    } = this.props

    let itemWidth = item_width
    let itemHeight = item_height - 50  // substract item footer

    // console.log(this.props)
    let thumb

    if (fromServer) {
      const mediaSize = fitMediaToWrapper(itemWidth, itemHeight, metadata.width, metadata.height)
      thumb = <ThumbnailSrv
        width={ mediaSize.width }
        height={ mediaSize.height }
        mime={ mime }
        videos={ videos }
        thumbs={ thumbs }
        metadata={ metadata }
        onClick={ () => this.openLightbox(id) }
      />
    }
    else if (mime) {
      thumb = <Thumbnail
        id={ id }
        width={ itemWidth }
        height={ itemHeight }
        mime={ mime }
        videos={ videos }
        uploader={ uploader }
      />
    }

    return connectDragSource(
      <li
        className={ classes.item }
        style={{
          height: item_height,
          width: item_width,
          marginRight: gap_width,
          marginBottom: gap_height
        }}
      >
        <Paper className={ classes.paperRoot }>

          <div
            className={ classes.thumbWrapper }
            style={{
              width: itemWidth,
              height: itemHeight
            }}
          >
            { thumb }
          </div>

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
                width={ itemWidth - 90 }
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
  dispatch: PropTypes.func.isRequired,
  uploader: PropTypes.object.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  item_width: PropTypes.number.isRequired,
  item_height: PropTypes.number.isRequired,
  gap_width: PropTypes.number.isRequired,
  gap_height: PropTypes.number.isRequired,
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
