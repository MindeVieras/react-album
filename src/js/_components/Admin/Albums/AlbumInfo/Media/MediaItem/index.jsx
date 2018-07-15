
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import { DragSource } from 'react-dnd'
import { IoCheckmarkCircled, IoBug } from 'react-icons/lib/io'

import Thumbnail from './Thumbnail'
import ThumbnailSrv from './ThumbnailSrv'
import ProgressBar from './progress-bar'
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
      id,
      media_id,
      status,
      fromServer,
      mime,
      metadata,
      filename,
      filesize,
      rekognition_labels,
      thumbs, videos, uploader,
      item_width,
      item_height,
      gap_width,
      gap_height,
      connectDragSource } = this.props

    // console.log(item_gap)
    let thumb
    let filenameWidth = item_width - 65
    let itemStyle = {
      width: `${item_width}px`,
      marginRight: `${gap_width}px`,
      marginBottom: `${gap_height}px`
    }
    let height = item_height - 90 // substract item footer
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
        className="uploader-file"
        style={ itemStyle }
      >

        <div
          style={{cursor: 'pointer'}}
          onClick={() => console.log('open lightbox')}
        >
          { thumb }
        </div>

        <ProgressBar
          id={ id }
          uploader={ uploader }
        />

        <div className="footer">
          <div className="status-bar">
            <div className="status">
              <Status
                id={ id }
                uploader={ uploader }
                fromServer={ fromServer }
              />
            </div>
            <div className="icons">
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
          <div className="info">
            <Filename
              filename={ filename }
              width={ filenameWidth }
            />
            <Filesize
              filesize={ filesize }
            />
          </div>
        </div>
        {media_id &&
          <RemoveButton
            media_id={ media_id }
          />
        }
      </li>
    )
  }
}

MediaItem.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  // media_id: PropTypes.number.isRequired
}

// MediaItem.defaultProps = {
//   wrapper_width: 500
// }

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

export default connect()(DragSource(utilsConstants.DND_MOVE_MEDIA, boxSource, dndCollect)(MediaItem))
