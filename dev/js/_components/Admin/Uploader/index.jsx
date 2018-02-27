
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FineUploaderTraditional from 'fine-uploader-wrappers'
import ReactTooltip from 'react-tooltip'
import { toastr } from 'react-redux-toastr'
import { IoCloseCircled, IoUpload } from 'react-icons/lib/io'

import Dropzone from './Partials/dropzone'
import TotalProgressBar from './Partials/total-progress-bar'

import MediaList from './MediaList'

import { authHeader, baseServerUrl } from '../../../_helpers'
import { footerActions, uploaderActions } from '../../../_actions'
import { mediaService } from '../../../_services'

class Uploader extends Component {

  constructor(props) {
    super(props)

    this.uploader = new FineUploaderTraditional({
      options: {
        debug: false,
        chunking: {
          enabled: false
        },
        request: {
          customHeaders: authHeader(),
          endpoint: baseServerUrl+'/api/upload'
        },
        deleteFile: {
          customHeaders: authHeader(),
          enabled: true,
          method: 'POST',
          endpoint: baseServerUrl+'/api/media/put-to-trash'
        }
      }
    })

    const uploader = this.uploader
    const statusEnum = uploader.qq.status

    this._onStatusChange = (id, oldStatus, status) => {
      // Submitting files
      if (status === statusEnum.SUBMITTED) {
        props.dispatch(uploaderActions.submitFile(id, status, false))
        // Set file data
        const { name, size, type } = uploader.methods.getFile(id)
        props.dispatch(uploaderActions.setMime(id, type))
        props.dispatch(uploaderActions.setFilename(id, name))
        props.dispatch(uploaderActions.setFilesize(id, size))
      }
      // On server or Uploaded
      else if (status === statusEnum.UPLOAD_SUCCESSFUL) {
        props.dispatch(uploaderActions.setStatus(id, status))
      }
      // Remove file
      else if (isFileGone(status, statusEnum)) {
        props.dispatch(uploaderActions.removeFile(id))
      }
    }

    this._onComplete = (id, name, responseJSON, xhr) => {
      const { dispatch } = this.props
      const file = responseJSON.data
      const media_id = file.media_id
      const key = file.s3_key
      const mime = file.mime
      
      dispatch(uploaderActions.setMediaId(id, media_id))
      dispatch(uploaderActions.saveMetadata(id, media_id))
      dispatch(uploaderActions.rekognitionLabels(id, media_id))
      
      // If IMAGE
      if (mime.includes('image')) {
        dispatch(uploaderActions.generateImageThumbs(id, media_id))
      }
      // If VIDEO
      else if (mime.includes('video')) {
        dispatch(uploaderActions.generateVideos(id, key))
      }
    }

    this._onDeleteComplete = (id, xhr, isError) => {
      const res = JSON.parse(xhr.responseText)
      if (res.ack == 'ok') {
        toastr.success('Success', res.msg)
      } else {
        toastr.error('Error', res.msg)
      }
    }
  }

  componentDidMount() {
    const uploader = this.uploader
    const { initial_media, entity_id, entity, status, dispatch } = this.props

    // Set footer upload input button
    dispatch(footerActions.buttonRemove('uploadMedia'))
    let buttonProps = {
      entity,
      entity_id,
      status,
      uploader
    }
    dispatch(footerActions.buttonSet('', 'uploadMedia', 'info', buttonProps))
    // console.log(this.uploader)
    // Add initial media
    initial_media.map((media, i) => {
      const { media_id, mime, name, size, thumbs, videos, metadata, rekognition_labels } = media
      let id = 100000 + i
      dispatch(uploaderActions.submitFile(id, 'upload successful', true))
      dispatch(uploaderActions.setMediaId(id, media_id))
      dispatch(uploaderActions.setMime(id, mime))
      dispatch(uploaderActions.setFilename(id, name))
      dispatch(uploaderActions.setFilesize(id, size))
      dispatch(uploaderActions.getMetadata(id, metadata))
      dispatch(uploaderActions.getRekognitionLabels(id, rekognition_labels))

      if (mime.includes('image')) {
        dispatch(uploaderActions.getImageThumbs(id, thumbs))
      }
      if (mime.includes('video')) {
        dispatch(uploaderActions.getVideos(id, videos))
      }
    })

    uploader.on('statusChange', this._onStatusChange)
    uploader.on('complete', this._onComplete)
  }

  componentWillUnmount() {
    this.uploader.off('statusChange', this._onStatusChange)
    this.uploader.off('complete', this._onComplete)
  }

  render() {
    const { entity, entity_id, status, files, initial_media, wrapper_width, dispatch } = this.props
    const uploader = this.uploader

    let counter = files.length
    
    // Remove/Add dropzone text and fileField if any visableFiles
    let uploaderText = ''
    if (files.length > 0 || initial_media.length > 0) {
      uploaderText = <span/>
    } else {
      uploaderText = <span className="dropzone-text">
        <div className="icon">
          <IoUpload />
        </div>
        Click or Drop files here
      </span>
    }

    return (
      <Dropzone
        uploader={ uploader }
        entity={ entity }
        entity_id={ entity_id }
        status={ status }
        multiple={ true }
        dropActiveClassName="active"
      >        
        <TotalProgressBar
          uploader={ uploader }
        />

        <div className="counter">
          { counter } files
        </div>
        
        <MediaList
          files={ files }
          uploader={ uploader }
          wrapper_width={ wrapper_width }
        />

        { uploaderText }

      </Dropzone>
    )
  }
}

Uploader.propTypes = {
  entity: PropTypes.number.isRequired,
  entity_id: PropTypes.number.isRequired,
  status: PropTypes.number.isRequired,
  initial_media: PropTypes.array.isRequired,
  files: PropTypes.array.isRequired,
  wrapper_width: PropTypes.number
}

Uploader.defaultProps = {
  'cancelButton-children': <IoCloseCircled />,
  wrapper_width: 500
}

const isFileGone = (statusToCheck, statusEnum) => {
  return [
    statusEnum.CANCELED,
    statusEnum.DELETED,
  ].indexOf(statusToCheck) >= 0
}

function mapStateToProps(state) {
  const { uploader } = state
  return {
    files: uploader.files
  }
}

const connectedUploader = connect(mapStateToProps)(Uploader)
export { connectedUploader as Uploader }
