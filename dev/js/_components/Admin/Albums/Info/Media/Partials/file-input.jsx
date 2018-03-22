
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IoUpload } from 'react-icons/lib/io'

class FileInput extends Component {

  constructor() {
    super()

    this.state = {
      key: newKey()
    }

    this._onFilesSelected = onFilesSelected.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    this.refs.fileUploader.click()
  }

  render() {
    const { ...inputProps } = this.props

    return (
      <div className={ `btn btn-sm btn-${this.props.btn_type}` } onClick={ this.handleClick.bind(this)}>
        <IoUpload />
        <input
          { ...inputProps }
          ref="fileUploader"
          className="uploader-file-input"
          key={ this.state.key }
          onChange={ this._onFilesSelected }
          style={{display: 'none'}}
          name="file"
          type="file"
        />
      </div>
    )
  }

  _resetInput() {
    this.setState({ key: newKey() })
  }
}

FileInput.propTypes = {
  uploader: PropTypes.object.isRequired,
  btn_type: PropTypes.string
}

FileInput.defaultProps = {
  btn_type: 'info'
}

const onFilesSelected = function(onChangeEvent) {
  const { uploader } = this.props
  uploader.methods.addFiles(onChangeEvent.target)
  this._resetInput()
}

const newKey = () => Date.now()

export default FileInput
