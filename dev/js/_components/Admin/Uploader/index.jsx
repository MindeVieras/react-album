
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FineUploaderTraditional from 'fine-uploader-wrappers'
import ReactTooltip from 'react-tooltip'
import { toastr } from 'react-redux-toastr'
import Lightbox from 'lightbox-react'
import { IoCloseCircled, IoUpload } from 'react-icons/lib/io'

import Dropzone from './Partials/dropzone'
import FileInput from './Partials/file-input'
import TotalProgressBar from './Partials/total-progress-bar'

import MediaList from './MediaList'

import { authHeader, baseServerUrl } from '../../../_helpers'
import { uploaderActions } from '../../../_actions'
import { mediaService } from '../../../_services'

// const images = [
//   '//placekitten.com/1500/500',
//   '//placekitten.com/4000/3000',
//   '//placekitten.com/800/1200',
//   '//placekitten.com/1500/1500'
// ]
class Uploader extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      photoIndex: 0,
      isOpen: false
    }

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
        this.props.dispatch(uploaderActions.submitFile(id, status, false))
        // Set file data
        const { name, size, type } = uploader.methods.getFile(id)
        this.props.dispatch(uploaderActions.setMime(id, type))
        this.props.dispatch(uploaderActions.setFilename(id, name))
        this.props.dispatch(uploaderActions.setFilesize(id, size))
      }
      // On server or Uploaded
      else if (status === statusEnum.UPLOAD_SUCCESSFUL) {
        this.props.dispatch(uploaderActions.setStatus(id, status))
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
    // Add initial media
    this.props.initial_media.map((media, i) => {
      const { media_id, mime, name, size, thumbs, videos, metadata, rekognition_labels } = media
      let id = 100000 + i
      this.props.dispatch(uploaderActions.submitFile(id, 'upload successful', true))
      this.props.dispatch(uploaderActions.setMediaId(id, media_id))
      this.props.dispatch(uploaderActions.setMime(id, mime))
      this.props.dispatch(uploaderActions.setFilename(id, name))
      this.props.dispatch(uploaderActions.setFilesize(id, size))
      this.props.dispatch(uploaderActions.getMetadata(id, metadata))
      this.props.dispatch(uploaderActions.getRekognitionLabels(id, rekognition_labels))

      if (mime.includes('image')) {
        this.props.dispatch(uploaderActions.getImageThumbs(id, thumbs))
      }
      if (mime.includes('video')) {
        this.props.dispatch(uploaderActions.getVideos(id, videos))
      }
    })

    this.uploader.on('statusChange', this._onStatusChange)
    this.uploader.on('complete', this._onComplete)
  }

  componentWillUnmount() {
    this.uploader.off('statusChange', this._onStatusChange)
    this.uploader.off('complete', this._onComplete)
  }

  render() {
    const { author, entity, entity_id, status, files, initial_media, dispatch } = this.props
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
    
    const images = initial_media.map((m, i) => {
      // return m.thumbs.thumb
      return <div style={{color:'white'}}>{ `image ${i}` }</div>
    })
    const { photoIndex, isOpen } = this.state
    
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
        <button
          type="button"
          className="btn btn-success pull-left"
          onClick={() => this.setState({ isOpen: true })}
        >
          LB
        </button>
        
        {isOpen &&
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() => this.setState({
              photoIndex: (photoIndex + images.length - 1) % images.length,
            })}
            onMoveNextRequest={() => this.setState({
              photoIndex: (photoIndex + 1) % images.length,
            })}
          />
        }
        
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
        
        <MediaList
          files={ files }
          uploader={ uploader }
        />

        { uploaderText }

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
