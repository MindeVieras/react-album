
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FineUploaderTraditional from 'fine-uploader-wrappers'
import { CSSTransitionGroup as ReactCssTransitionGroup } from 'react-transition-group'

import CancelButton from './Partials/cancel-button'
import DeleteButton from './Partials/delete-button'
import Dropzone from './Partials/dropzone'
import FileInput from './Partials/file-input'
import Filename from './Partials/filename'
import Filesize from './Partials/filesize'
import RetryButton from './Partials/retry-button'
import PauseResumeButton from './Partials/pause-resume-button'
import ProgressBar from './Partials/progress-bar'
import Status from './Partials/status'
import Thumbnail from './Partials/thumbnail'

import { IoCloseCircled, IoCheckmarkCircled, IoUpload, IoPause, IoPlay, IoBug } from 'react-icons/lib/io'

import { authHeader, baseServerUrl } from '../../_helpers'
import { uploaderActions } from '../../_actions'
import { mediaService } from '../../_services'

class Uploader extends Component {

  constructor(props) {
    super(props)

    this.state = {
      visibleFiles: []
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
    const statusEnum = this.uploader.qq.status

    this._onStatusChange = (id, oldStatus, status) => {
      const visibleFiles = this.state.visibleFiles

      if (status === statusEnum.SUBMITTED) {
        visibleFiles.push({ id })
        this.setState({ visibleFiles })
      }
      else if (isFileGone(status, statusEnum)) {
        this._removeVisibleFile(id)
      }
      else if (status === statusEnum.UPLOAD_SUCCESSFUL || status === statusEnum.UPLOAD_FAILED) {
        if (status === statusEnum.UPLOAD_SUCCESSFUL) {
          const visibleFileIndex = this._findFileIndex(id)
          if (visibleFileIndex < 0) {
            visibleFiles.push({ id, fromServer: true })
          }
        }
        this._updateVisibleFileStatus(id, status)
      }
    }

    this._onComplete = (id, name, responseJSON, xhr) => {
      const { entity_id, dispatch } = this.props
      const file = responseJSON.data
      mediaService.attach(file.media_id, entity_id)
    }
  }

  componentDidMount() {
    this.uploader.on('statusChange', this._onStatusChange)
    this.uploader.on('complete', this._onComplete)
  }

  componentWillUnmount() {
    this.uploader.off('statusChange', this._onStatusChange)
  }

  render() {
    const { author, entity } = this.props
    const uploader = this.uploader
    const cancelButtonProps = getComponentProps('cancelButton', this.props)
    const dropzoneProps = getComponentProps('dropzone', this.props)
    const fileInputProps = getComponentProps('fileInput', this.props)
    const filenameProps = getComponentProps('filename', this.props)
    const filesizeProps = getComponentProps('filesize', this.props)
    const progressBarProps = getComponentProps('progressBar', this.props)
    const retryButtonProps = getComponentProps('retryButton', this.props)
    const statusProps = getComponentProps('status', this.props)
    const thumbnailProps = getComponentProps('thumbnail', this.props)

    const chunkingEnabled = uploader.options.chunking && uploader.options.chunking.enabled
    const deleteEnabled = uploader.options.deleteFile && uploader.options.deleteFile.enabled
    const deleteButtonProps = deleteEnabled && getComponentProps('deleteButton', this.props)
    const pauseResumeButtonProps = chunkingEnabled && getComponentProps('pauseResumeButton', this.props)
    // console.log(initialFiles)
    
    // Remove/Add dropzone text and fileField if any visableFiles
    let uploaderText = ''
    let fileField = ''
    if (this.state.visibleFiles.length > 0) {
      uploaderText = <span/>
      fileField = <FileInput
        uploader={ uploader }
        author={ author }
        entity={ entity }
        multiple={ true }
      />
    } else {
      uploaderText = <span className="react-fine-uploader-gallery-dropzone-content">
        <div className="react-fine-uploader-gallery-dropzone-upload-icon">
          <IoUpload />
        </div>
        Click or Drop files here
      </span>
      fileField = <span/>
    }

    return (
      <Dropzone
        uploader={ uploader }
        { ...dropzoneProps }
      >
        { uploaderText }
        <ProgressBar
          className='react-fine-uploader-gallery-total-progress-bar'
          uploader={ uploader }
          { ...progressBarProps }
        />
        <ReactCssTransitionGroup
          className='react-fine-uploader-gallery-files'
          component='ul'
          transitionEnter={ !this.props.animationsDisabled }
          transitionEnterTimeout={ 500 }
          transitionLeave={ !this.props.animationsDisabled }
          transitionLeaveTimeout={ 300 }
          transitionName='react-fine-uploader-gallery-files'
        >
          {
            this.state.visibleFiles.map(({ id, status, fromServer }) => {
              // console.log(uploader.methods.getName(id));
              return (
                <li
                  key={ id }
                  className='react-fine-uploader-gallery-file'
                >
                  <ProgressBar
                    className='react-fine-uploader-gallery-progress-bar'
                    id={ id }
                    uploader={ uploader }
                    { ...progressBarProps }
                  />
                  <Thumbnail
                    className='react-fine-uploader-gallery-thumbnail'
                    id={ id }
                    fromServer={ fromServer }
                    uploader={ uploader }
                    { ...thumbnailProps }
                  />
                  {status === 'upload successful' &&
                    <span>
                      <div className='react-fine-uploader-gallery-upload-success-icon'>
                        <IoCheckmarkCircled />
                      </div>
                      <div className='react-fine-uploader-gallery-thumbnail-icon-backdrop' />
                    </span>
                  }
                  {status === 'upload failed' &&
                    <span>
                      <div className='react-fine-uploader-gallery-upload-failed-icon'>
                        <IoBug />
                      </div>
                      <div className='react-fine-uploader-gallery-thumbnail-icon-backdrop' />
                    </span>
                  }
                  <div className='react-fine-uploader-gallery-file-footer'>
                    <Filename
                      className='react-fine-uploader-gallery-filename'
                      id={ id }
                      uploader={ uploader }
                      { ...filenameProps }
                    />
                    <Status
                      className='react-fine-uploader-gallery-status'
                      id={ id }
                      uploader={ uploader }
                      { ...statusProps }
                    />
                    <Filesize
                      className='react-fine-uploader-gallery-filesize'
                      id={ id }
                      uploader={ uploader }
                      { ...filesizeProps }
                    />
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
          { fileField }
        </ReactCssTransitionGroup>
      </Dropzone>
    )
  }

  _removeVisibleFile(id) {
    const visibleFileIndex = this._findFileIndex(id)

    if (visibleFileIndex >= 0) {
      const visibleFiles = this.state.visibleFiles

      visibleFiles.splice(visibleFileIndex, 1)
      this.setState({ visibleFiles })
    }
  }

  _updateVisibleFileStatus(id, status) {
    this.state.visibleFiles.some(file => {
      if (file.id === id) {
        file.status = status
        this.setState({ visibleFiles: this.state.visibleFiles })
        return true
      }
    })
  }

  _findFileIndex(id) {
    let visibleFileIndex = -1

    this.state.visibleFiles.some((file, index) => {
      if (file.id === id) {
        visibleFileIndex = index
        return true
      }
    })

    return visibleFileIndex
  }
}

Uploader.propTypes = {
  author: PropTypes.number.isRequired,
  entity: PropTypes.number.isRequired,
  entity_id: PropTypes.number
}

Uploader.defaultProps = {
  'cancelButton-children': <IoCloseCircled />,
  'deleteButton-children': <IoCloseCircled />,
  'dropzone-dropActiveClassName': 'react-fine-uploader-gallery-dropzone-active',
  'dropzone-multiple': true,
  'pauseResumeButton-pauseChildren': <IoPause />,
  'pauseResumeButton-resumeChildren': <IoPlay />,
  'retryButton-children': <IoPlay />,
  'thumbnail-maxSize': 240
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

// export default Uploader
function mapStateToProps(state) {
  const { auth, upload } = state
  return {
    auth
  }
}

const connectedUploader = connect(mapStateToProps)(Uploader)
export { connectedUploader as Uploader }
