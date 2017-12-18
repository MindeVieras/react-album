
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FineUploaderTraditional from 'fine-uploader-wrappers'
import { CSSTransitionGroup as ReactCssTransitionGroup } from 'react-transition-group'
import ReactTooltip from 'react-tooltip'

import CancelButton from './Partials/cancel-button'
import DeleteButton from './Partials/delete-button'
import Dropzone from './Partials/dropzone'
import FileInput from './Partials/file-input'
import Filename from './Partials/filename'
import Filesize from './Partials/filesize'
import RetryButton from './Partials/retry-button'
import PauseResumeButton from './Partials/pause-resume-button'
import ProgressBar from './Partials/progress-bar'
import TotalProgressBar from './Partials/total-progress-bar'
import Status from './Partials/status'
import Thumbnail from './Partials/thumbnail'

import { IoCloseCircled, IoCheckmarkCircled, IoClipboard, IoUpload, IoPause, IoPlay, IoBug } from 'react-icons/lib/io'

import { authHeader, baseServerUrl } from '../../_helpers'
import { uploaderActions } from '../../_actions'
import { mediaService } from '../../_services'

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
        session: {
          customHeaders: authHeader(),
          endpoint: baseServerUrl+'/api/upload/get-initial-files/'+props.entity_id
        },
        // cors: {
        //   expected: true,
        //   // sendCredentials: true
        // }
      }
    })
    // console.log(this.uploader)
    const uploader = this.uploader
    const statusEnum = uploader.qq.status

    this._onStatusChange = (id, oldStatus, status) => {
      // Submitting files
      if (status === statusEnum.SUBMITTED) {
        this.props.dispatch(uploaderActions.submitFile(id, status, false))
      }
      // On server or Uploaded
      else if (status === statusEnum.UPLOAD_SUCCESSFUL) {
        if (oldStatus == null) {
          this.props.dispatch(uploaderActions.submitFile(id, status, true))
        }
      }
      // Remove file
      else if (isFileGone(status, statusEnum)) {
        this.props.dispatch(uploaderActions.removeFile(id))
      }
    }

    this._onComplete = (id, name, responseJSON, xhr) => {
      const file = responseJSON.data
      const mime = file.mime

      // If IMAGE
      if (mime.includes('image')) {
        // console.log(file)

      }
      // If VIDEO
      else if (mime.includes('video')) {
        // console.log('video')
      }
    }
  }

  componentDidMount() {
    this.uploader.on('statusChange', this._onStatusChange)
    this.uploader.on('complete', this._onComplete)
  }

  componentWillUnmount() {
    this.uploader.off('statusChange', this._onStatusChange)
    this.uploader.off('complete', this._onComplete)
  }

  render() {
    const { author, entity, entity_id, status, files } = this.props
    const uploader = this.uploader
    const cancelButtonProps = getComponentProps('cancelButton', this.props)
    const dropzoneProps = getComponentProps('dropzone', this.props)
    const fileInputProps = getComponentProps('fileInput', this.props)
    const filesizeProps = getComponentProps('filesize', this.props)
    const retryButtonProps = getComponentProps('retryButton', this.props)

    const chunkingEnabled = uploader.options.chunking && uploader.options.chunking.enabled
    const deleteEnabled = uploader.options.deleteFile && uploader.options.deleteFile.enabled
    const deleteButtonProps = deleteEnabled && getComponentProps('deleteButton', this.props)
    const pauseResumeButtonProps = chunkingEnabled && getComponentProps('pauseResumeButton', this.props)
    // console.log(this.state)
    
    // Remove/Add dropzone text and fileField if any visableFiles
    let uploaderText = ''
    if (files.length > 0) {
      uploaderText = <span/>
    } else {
      uploaderText = <span className="react-fine-uploader-gallery-dropzone-content">
        <div className="react-fine-uploader-gallery-dropzone-upload-icon">
          <IoUpload />
        </div>
        Click or Drop files here
      </span>
    }
    console.log(this.props.author)
    return (
      <Dropzone
        uploader={ uploader }
        author={ author }
        entity={ entity }
        entity_id={ entity_id }
        status={ status }
        multiple={ true }
        { ...dropzoneProps }
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

        <ReactCssTransitionGroup
          className="uploader-files"
          component="ul"
          transitionEnter={ !this.props.animationsDisabled }
          transitionEnterTimeout={ 500 }
          transitionLeave={ !this.props.animationsDisabled }
          transitionLeaveTimeout={ 300 }
          transitionName="uploader-files"
        >
          {
            files.map(({ id, status, fromServer }) => {
              return (
                <li
                  key={ id }
                  className="uploader-file"
                >
                  
                  <Thumbnail
                    id={ id }
                    fromServer={ fromServer }
                    uploader={ uploader }
                    maxSize={ 240 }
                  />
                  
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
                        <div
                          className="icon success"
                          data-tip="Metadata saved"
                        >
                          <IoClipboard />
                          <ReactTooltip />
                        </div>
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
                        className="react-fine-uploader-gallery-filename"
                        id={ id }
                        uploader={ uploader }
                      />
                      <Filesize
                        className='react-fine-uploader-gallery-filesize'
                        id={ id }
                        uploader={ uploader }
                        { ...filesizeProps }
                      />
                    </div>
                  </div>

                  <CancelButton
                    className='react-fine-uploader-gallery-cancel-button'
                    id={ id }
                    uploader={ uploader }
                    { ...cancelButtonProps }
                  />
                  <RetryButton
                    className='react-fine-uploader-gallery-retry-button'
                    id={ id }
                    uploader={ uploader }
                    { ...retryButtonProps }
                  />
                  {deleteEnabled &&
                    <DeleteButton
                      className='react-fine-uploader-gallery-delete-button'
                      id={ id }
                      uploader={ uploader }
                      { ...deleteButtonProps }
                    />
                  }
                  {chunkingEnabled &&
                    <PauseResumeButton
                      className='react-fine-uploader-gallery-pause-resume-button'
                      id={ id }
                      uploader={ uploader }
                      { ...pauseResumeButtonProps }
                    />
                  }
                </li>
              )
            })
          }
          { uploaderText }
        </ReactCssTransitionGroup>
      </Dropzone>
    )
  }
}

Uploader.propTypes = {
  author: PropTypes.number.isRequired,
  entity: PropTypes.number.isRequired,
  entity_id: PropTypes.number.isRequired,
  files: PropTypes.array.isRequired
}

Uploader.defaultProps = {
  'cancelButton-children': <IoCloseCircled />,
  'deleteButton-children': <IoCloseCircled />,
  'dropzone-dropActiveClassName': 'react-fine-uploader-gallery-dropzone-active',
  'pauseResumeButton-pauseChildren': <IoPause />,
  'pauseResumeButton-resumeChildren': <IoPlay />,
  'retryButton-children': <IoPlay />
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
