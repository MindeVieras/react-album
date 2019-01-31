
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import { DragSource } from 'react-dnd'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import blueGrey from '@material-ui/core/colors/blueGrey'

import { IoCheckmarkCircled, IoBug } from 'react-icons/io'

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
import StatusRekognitionTextIcon from '../Icons/StatusRekognitionText'

import { fitMediaToWrapper } from 'Helpers'
import { utilsConstants } from 'Constants'
import { albumsActions, adminUiActions } from 'Actions'

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
  statusIcons: {
    display: `flex`,
    alignItems: `center`,
    height: theme.spacing.unit * 2.5
  },
  statusIcon: {
    display: `flex`,
    fontSize: 16,
    marginLeft: theme.spacing.unit / 3
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
      width, height,
      id, media_id,
      status, fromServer,
      mime, filename, filesize,
      metadata, rekognition_labels, rekognition_text,
      thumbs, videos
    } = this.props

    let itemWidth = item_width
    let itemHeight = item_height - 50  // substract item footer

    let thumb
    
    if (fromServer) {
      const mediaSize = fitMediaToWrapper(itemWidth, itemHeight, width, height)
      thumb = <ThumbnailSrv
        id={ id }
        width={ mediaSize.width }
        height={ mediaSize.height }
        mime={ mime }
        videos={ videos }
        thumbs={ thumbs }
        metadata={ metadata }
        text={ rekognition_text.text }
        onClick={ () => this.openLightbox(id) }
      />
    }
    else {
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
              {media_id &&
                <div className={ classes.statusIcons }>
                  {rekognition_text &&
                    <StatusRekognitionTextIcon
                      rekognition_text={ rekognition_text }
                      id={ id }
                      media_id={ media_id }
                      className={ classes.statusIcon }
                    />
                  }
                  {mime && rekognition_labels &&
                    <StatusRekognitionLabelsIcon
                      rekognition_labels={ rekognition_labels }
                      mime={ mime }
                      id={ id }
                      media_id={ media_id }
                      className={ classes.statusIcon }
                    />
                  }
                  {metadata &&
                    <StatusMetadataIcon
                      metadata={ metadata }
                      id={ id }
                      media_id={ media_id }
                      className={ classes.statusIcon }
                    />
                  }
                  {thumbs &&
                    <StatusGenerateImageThumbsIcon
                      thumbs={ thumbs }
                      id={ id }
                      media_id={ media_id }
                      className={ classes.statusIcon }
                    />
                  }
                  {/* {videos &&
                    <StatusGenerateVideosIcon
                      videos={ videos }
                      id={ id }
                      media_id={ media_id }
                      className={ classes.statusIcon }
                    />
                  } */}
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
              }
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
  status: PropTypes.string,
  mime: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  filename: PropTypes.string,
  filesize: PropTypes.number,
  media_id: PropTypes.number,
  fromServer: PropTypes.bool,
  thumbs: PropTypes.object,
  videos: PropTypes.object,
  metadata: PropTypes.object,
  rekognition_labels: PropTypes.object,
  rekognition_text: PropTypes.object
}

MediaItem.defaultProps = {
  status: '',
  mime: '',
  width: null,
  height: null,
  filename: '',
  filesize: 0,
  media_id: null,
  fromServer: false,
  thumbs: null,
  videos: null,
  metadata: null,
  rekognition_labels: null,
  rekognition_text: null
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
