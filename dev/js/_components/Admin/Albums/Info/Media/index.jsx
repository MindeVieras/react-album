
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

import { authHeader, baseServerUrl } from '../../../../../_helpers'
import { footerActions, albumsActions } from '../../../../../_actions'
import { mediaService } from '../../../../../_services'

class Media extends Component {

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
        props.dispatch(albumsActions.submitMedia(id, status, false))
        // Set media data
        const { name, size, type } = uploader.methods.getFile(id)
        const data = { filename: name, size, mime: type }
        props.dispatch(albumsActions.setMediaData(id, data))
      }
      // On server or Uploaded
      else if (status === statusEnum.UPLOAD_SUCCESSFUL) {
        props.dispatch(albumsActions.setMediaPhase(id, status))
      }
    }

    this._onComplete = (id, name, responseJSON, xhr) => {
      const { dispatch } = this.props
      const { media_id, s3_key, mime } = responseJSON.data
      
      dispatch(albumsActions.setMediaMediaId(id, media_id))
      dispatch(albumsActions.saveMediaMetadata(id, media_id))
      dispatch(albumsActions.saveRekognitionLabels(id, media_id))
      
      // If IMAGE
      if (mime.includes('image')) {
        dispatch(albumsActions.generateImageThumbs(id, media_id))
      }
      // If VIDEO
      else if (mime.includes('video')) {
        dispatch(albumsActions.generateVideos(id, s3_key))
      }
    }

  }

  componentDidMount() {
    const uploader = this.uploader
    const { entity_id, entity, status, dispatch } = this.props

    // Set footer upload input button
    dispatch(footerActions.buttonRemove('uploadMedia'))
    let buttonProps = {
      entity,
      entity_id,
      status,
      uploader
    }
    dispatch(footerActions.buttonSet('', 'uploadMedia', 'info', buttonProps))

    uploader.on('statusChange', this._onStatusChange)
    uploader.on('complete', this._onComplete)
  }

  componentWillUnmount() {
    this.uploader.off('statusChange', this._onStatusChange)
    this.uploader.off('complete', this._onComplete)
  }

  render() {
    const { t } = this.context
    const { entity, entity_id, status, files, wrapper_width, wrapper_height, dispatch } = this.props
    const uploader = this.uploader

    let counter = files.length
    
    // Remove/Add dropzone text and fileField if any visableFiles
    let uploaderText = ''
    if (files.length > 0) {
      uploaderText = <span/>
    } else {
      uploaderText = <span className="dropzone-text">
        <div className="icon">
          <IoUpload />
        </div>
        { t('Drop files here') }
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
          wrapper_height={ wrapper_height }
        />

        { uploaderText }

      </Dropzone>
    )
  }
}

Media.propTypes = {
  entity: PropTypes.number.isRequired,
  entity_id: PropTypes.number.isRequired,
  status: PropTypes.number.isRequired,
  files: PropTypes.array.isRequired,
  wrapper_width: PropTypes.number,
  wrapper_height: PropTypes.number
}

Media.defaultProps = {
  wrapper_width: 500,
  wrapper_height: 600
}

Media.contextTypes = {
  t: PropTypes.func
}

export default connect()(Media)
