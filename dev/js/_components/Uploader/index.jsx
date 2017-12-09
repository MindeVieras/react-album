
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

const uploader = new FineUploaderTraditional({
  options: {
    chunking: {
      enabled: false
    },
    request: {
      customHeaders: authHeader(),
      endpoint: baseServerUrl+'/api/upload'
    }
  }
})
// console.log(uploader)

class Uploader extends Component {

  constructor(props) {
    super(props)

    this.state = {
      visibleFiles: []
    }
    const statusEnum = uploader.qq.status

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
      const { dispatch } = this.props
      const file = responseJSON.data
      dispatch(uploaderActions.media(file))
    }
  }

  componentDidMount() {
    uploader.on('statusChange', this._onStatusChange)
    uploader.on('complete', this._onComplete)
  }

  componentWillUnmount() {
    uploader.off('statusChange', this._onStatusChange)
    uploader.off('complete', this._onComplete)
  }

  render() {
    const author = this.props.author
    const entity = this.props.entity
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
    // console.log(author);
    return (
      <MaybeDropzone
        content={ this.props.children }
        hasVisibleFiles={ this.state.visibleFiles.length > 0 }
        uploader={ uploader }
        { ...dropzoneProps }
      >
        {!fileInputProps.disabled &&
          <FileInputComponent author={ author } entity={ entity } uploader={ uploader } { ...fileInputProps }/>
        }
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
        </ReactCssTransitionGroup>
      </MaybeDropzone>
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
  className: PropTypes.string,
  author: PropTypes.number.isRequired,
  entity: PropTypes.number.isRequired
}

Uploader.defaultProps = {
  className: '',
  'cancelButton-children': <IoCloseCircled />,
  'deleteButton-children': <IoCloseCircled />,
  'dropzone-disabled': false,
  'dropzone-dropActiveClassName': 'react-fine-uploader-gallery-dropzone-active',
  'dropzone-multiple': true,
  'fileInput-multiple': true,
  'pauseResumeButton-pauseChildren': <IoPause />,
  'pauseResumeButton-resumeChildren': <IoPlay />,
  'retryButton-children': <IoPlay />,
  'thumbnail-maxSize': 130
}

const MaybeDropzone = ({ children, content, hasVisibleFiles, uploader, ...props }) => {
  const { disabled, ...dropzoneProps } = props

  let dropzoneDisabled = disabled
  if (!dropzoneDisabled) {
    dropzoneDisabled = !uploader.qq.supportedFeatures.fileDrop
  }

  if (hasVisibleFiles) {
    content = <span/>
  }
  else {
    content = content || getDefaultMaybeDropzoneContent({ content, disabled: dropzoneDisabled })
  }

  if (dropzoneDisabled) {
    return (
      <div className='react-fine-uploader-gallery-nodrop-container'>
        { content }
        { children }
      </div>
    )
  }

  return (
    <Dropzone
      className='react-fine-uploader-gallery-dropzone'
      uploader={ uploader }
      { ...dropzoneProps }
    >
      { content }
      { children }
    </Dropzone>
  )
}

const FileInputComponent = ({ uploader, ...props }) => {
  const { children, ...fileInputProps } = props
  const content = children || (
    <span>
      <div className='react-fine-uploader-gallery-file-input-upload-icon'>
        <IoUpload />
      </div>
      Select Files
    </span>
  )

  return (
    <FileInput
      className='react-fine-uploader-gallery-file-input-container'
      uploader={ uploader }
      { ...fileInputProps }
    >
      <span className='react-fine-uploader-gallery-file-input-content'>
        { content }
      </span>
    </FileInput>
  )
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

const getDefaultMaybeDropzoneContent = ({ content, disabled }) => {
  const className = disabled
    ? 'react-fine-uploader-gallery-nodrop-content'
    : 'react-fine-uploader-gallery-dropzone-content'

  if (disabled && !content) {
    return (
      <span className={ className }>
        Upload files
      </span>
    )
  }
  else if (content) {
    return <span className={ className }>{ content }</span>
  }
  else if (!disabled) {
    return (
      <span className={ className }>
        <div className='react-fine-uploader-gallery-dropzone-upload-icon'>
          <IoUpload />
        </div>
        Drop files here
      </span>
    )
  }
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
