
import React from 'react'
import ReactTooltip from 'react-tooltip'
import { IoCheckmarkCircled, IoBug } from 'react-icons/lib/io'

import Thumbnail from './thumbnail'
import ProgressBar from './progress-bar'
import Status from './Status'
import Filename from './Filename'
import Filesize from './Filesize'
import RemoveButton from './remove-button'

import StatusMetadataIcon from '../Icons/StatusMetadata'
import StatusGenerateImageThumbsIcon from '../Icons/StatusGenerateImageThumbs'
import StatusGenerateVideosIcon from '../Icons/StatusGenerateVideos'
import StatusRekognitionLabelsIcon from '../Icons/StatusRekognitionLabels'

const MediaItem = ({id, media_id, status, fromServer, mime, metadata, filename, filesize, rekognition_labels, thumbs, videos, uploader }) => {
  // console.log(filesize)
  return (
    <li className="uploader-file">
      {mime &&
        <Thumbnail
          id={ id }
          fromServer={ fromServer }
          uploader={ uploader }
          maxSize={ 240 }
          mime={ mime }
          videos={ videos }
        />
      }
      
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
          />
          <Filesize
            filesize={ filesize }
          />
        </div>
      </div>
      <RemoveButton
        id={ id }
        uploader={ uploader }
        status={ status }
      />
    </li>
  )
}

export default MediaItem
