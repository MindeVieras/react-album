
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FineUploaderTraditional from 'fine-uploader-wrappers'
import ReactTooltip from 'react-tooltip'
import { toastr } from 'react-redux-toastr'
import { IoCloseCircled, IoUpload } from 'react-icons/lib/io'

import Dropzone from './Partials/dropzone'
import FileInput from './Partials/file-input'
import TotalProgressBar from './Partials/total-progress-bar'

import MediaItem from './MediaItem'

import { authHeader, baseServerUrl } from '../../../_helpers'
import { uploaderActions } from '../../../_actions'
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
        // session: {
        //   customHeaders: authHeader(),
        //   endpoint: baseServerUrl+'/api/upload/get-initial-files/'+props.entity_id,
        //   refreshOnReset: false
        // },
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
        this.props.dispatch(uploaderActions.submitFile(id, status, false))
        // Set file data
        const { name, size, type } = uploader.methods.getFile(id)
        this.props.dispatch(uploaderActions.setMime(id, type))
        this.props.dispatch(uploaderActions.setFilename(id, name))
        this.props.dispatch(uploaderActions.setFilesize(id, size))
      }
      // On server or Uploaded
      else if (status === statusEnum.UPLOAD_SUCCESSFUL) {
        // if (oldStatus == null) {
          // this.props.dispatch(uploaderActions.submitFile(id, status, true))
        // }
        // else {
          this.props.dispatch(uploaderActions.setStatus(id, status))
        // }
      }
      // Remove file
      else if (isFileGone(status, statusEnum)) {
        this.props.dispatch(uploaderActions.removeFile(id))
      }
    }

    this._onComplete = (id, name, responseJSON, xhr) => {
      const { dispatch } = this.props
      const file = responseJSON.data
      const media_id = file.media_id
      const key = file.s3_key
      const mime = file.mime
      
      dispatch(uploaderActions.setMediaId(id, media_id))
      // dispatch(uploaderActions.setMime(id, mime))
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

    // this._sessionComplete = (response, success, xhr) => {
    //   const { dispatch } = this.props
    //   response.forEach(function(file, id){
    //     const { media_id, metadata, rekognition_labels, thumbs, mime, videos } = file
    //     dispatch(uploaderActions.setMediaId(id, media_id))
    //     dispatch(uploaderActions.setMime(id, mime))
    //     dispatch(uploaderActions.getMetadata(id, metadata))
    //     dispatch(uploaderActions.getRekognitionLabels(id, rekognition_labels))

    //     if (mime === 'image') {
    //       dispatch(uploaderActions.getImageThumbs(id, thumbs))
    //     }
    //     if (mime === 'video') {
    //       dispatch(uploaderActions.getVideos(id, videos))
    //     }
    //   })
    // }

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
    // Add initial media
    this.props.initial_media.map((media, i) => {
      const { media_id, mime, name, size } = media
      let id = 100000 + i
      this.props.dispatch(uploaderActions.submitFile(id, 'upload successful', true))
      this.props.dispatch(uploaderActions.setMediaId(id, media_id))
      this.props.dispatch(uploaderActions.setMime(id, mime))
      this.props.dispatch(uploaderActions.setFilename(id, name))
      this.props.dispatch(uploaderActions.setFilesize(id, size))
    })

    this.uploader.on('statusChange', this._onStatusChange)
    this.uploader.on('complete', this._onComplete)
    // this.uploader.on('sessionRequestComplete', this._sessionComplete)
    // this.uploader.on('deleteComplete', this._onDeleteComplete)
  }

  componentWillUnmount() {
    this.uploader.off('statusChange', this._onStatusChange)
    this.uploader.off('complete', this._onComplete)
    // this.uploader.off('sessionRequestComplete', this._sessionComplete)
    // this.uploader.off('deleteComplete', this._onDeleteComplete)
  }

  render() {
    const { author, entity, entity_id, status, files, initial_media, dispatch } = this.props
    const uploader = this.uploader

    let counter = files.length

    const cancelButtonProps = getComponentProps('cancelButton', this.props)

    const deleteEnabled = uploader.options.deleteFile && uploader.options.deleteFile.enabled
    
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
        author={ author }
        entity={ entity }
        entity_id={ entity_id }
        status={ status }
        multiple={ true }
        dropActiveClassName="active"
      >
        
        <TotalProgressBar
          uploader={ uploader }
        />
        
        <FileInput
          uploader={ uploader }
          author={ author }
          entity={ entity }
          entity_id={ entity_id }
          status={ status }
          multiple={ true }
        />

        <div className="counter">
          { counter } files
        </div>
        
        <ul
          className="uploader-files"
        >
          

          {
            files.map((props, i) => {
              return (
                <MediaItem
                  key={ i }
                  uploader={ uploader }
                  { ...props }
                />
              )
            })
          }
          { uploaderText }
        </ul>
      </Dropzone>
    )
  }
}

Uploader.propTypes = {
  author: PropTypes.number.isRequired,
  entity: PropTypes.number.isRequired,
  entity_id: PropTypes.number.isRequired,
  initial_media: PropTypes.array.isRequired,
  files: PropTypes.array.isRequired
}

Uploader.defaultProps = {
  'cancelButton-children': <IoCloseCircled />
}

const getComponentProps = (componentName, allProps) => {
  const componentProps = {}

  Object.keys(allProps).forEach(propName => {
    if (propName.indexOf(componentName + '-') === 0) {
      const componentPropName = propName.substr(componentName.length + 1)
      componentProps[componentPropName] = allProps[propName]
    }
  })

  return componentProps
}

const isFileGone = (statusToCheck, statusEnum) => {
  return [
    statusEnum.CANCELED,
    statusEnum.DELETED,
  ].indexOf(statusToCheck) >= 0
}

function mapStateToProps(state) {
  const { auth, uploader } = state
  return {
    author: auth.user.id,
    files: uploader.files
  }
}

const connectedUploader = connect(mapStateToProps)(Uploader)
export { connectedUploader as Uploader }
