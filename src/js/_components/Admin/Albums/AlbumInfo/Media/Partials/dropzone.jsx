
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import qq from 'fine-uploader/lib/dnd'

class Dropzone extends Component {

  componentDidMount() {
    this._registerDropzone()
  }

  componentDidUpdate() {
    this._registerDropzone()
  }

  componentWillUnmount() {
    this._qqDropzone && this._qqDropzone.dispose()
  }

  render() {
    const { uploader, ...elementProps } = this.props // eslint-disable-line no-unused-vars

    return (
      <div
        { ...getElementProps(this.props) }
        ref="dropZone"
      >
        { this.props.children }
      </div>
    )
  }

  _onDropError(errorCode, errorData) {
    console.error(errorCode, errorData)

    this.props.onDropError && this.props.onDropError(errorCode, errorData)
  }

  _onProcessingDroppedFilesComplete(files) {
    const { uploader } = this.props
    uploader.methods.addFiles(files)

    if (this.props.onProcessingDroppedFilesComplete) {
      this.props.onProcessingDroppedFilesComplete(files)
    }
  }

  _registerDropzone() {
    this._qqDropzone && this._qqDropzone.dispose()

    const dropzoneEl = this.refs.dropZone
    // console.log(this.props);
    this._qqDropzone = new qq.DragAndDrop({
      allowMultipleItems: !!this.props.multiple,
      callbacks: {
        dropError: this._onDropError.bind(this),
        processingDroppedFiles: this.props.onProcessingDroppedFiles || function() {},
        processingDroppedFilesComplete: this._onProcessingDroppedFilesComplete.bind(this)
      },
      classes: {
        dropActive: this.props.dropActiveClassName || ''
      },
      dropZoneElements: [dropzoneEl]
    })
  }
}

Dropzone.propTypes = {
  uploader: PropTypes.object.isRequired,
  children: PropTypes.node,
  dropActiveClassName: PropTypes.string,
  multiple: PropTypes.bool,
  onDropError: PropTypes.func,
  onProcessingDroppedFiles: PropTypes.func,
  onProcessingDroppedFilesComplete: PropTypes.func
}

Dropzone.defaultProps = {
  dropActiveClassName: 'active',
  children: <span />,
  multiple: false,
  onDropError: null,
  onProcessingDroppedFiles: null,
  onProcessingDroppedFilesComplete: null
}

const getElementProps = actualProps => {
  const actualPropsCopy = { ...actualProps }
  const expectedPropNames = Object.keys(Dropzone.propTypes)

  expectedPropNames.forEach(expectedPropName => delete actualPropsCopy[expectedPropName])
  return actualPropsCopy
}

export default Dropzone
