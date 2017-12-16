
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
    const { uploader, ...inputProps } = this.props

    return (
      <div>
        <div className="uploader-file-input" onClick={ this.handleClick.bind(this)}>
          <div className="icon">
            <IoUpload />
          </div>
        </div>
        <input
          { ...inputProps }
          ref="fileUploader"
          className="uploader-file-input"
          key={ this.state.key }
          onChange={ this._onFilesSelected }
          style={{display: "none"}}
          name='file'
          type='file'
        />
      </div>
    )
  }

  _resetInput() {
    this.setState({ key: newKey() })
  }
}

FileInput.propTypes = {
  author: PropTypes.number.isRequired,
  entity: PropTypes.number.isRequired,
  entity_id: PropTypes.number.isRequired,
  status: PropTypes.number.isRequired,
  uploader: PropTypes.object.isRequired
}

const onFilesSelected = function(onChangeEvent) {
  const { author, entity, entity_id, status, uploader } = this.props
  const params = { author, entity, entity_id, status }
  uploader.methods.addFiles(onChangeEvent.target, params)
  this._resetInput()
}

const newKey = () => Date.now()

export default FileInput
