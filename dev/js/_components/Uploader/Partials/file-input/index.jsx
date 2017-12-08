
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import StyleableElement from './styleable-element'

class FileInput extends Component {

  constructor() {
    super()

    this.state = {
      key: newKey()
    }

    this._onFilesSelected = onFilesSelected.bind(this)
  }

  render() {
    const { text, uploader, ...elementProps } = this.props

    return (
      <StyleableElement
        { ...elementProps }
        key={ this.state.key }
        onChange={ this._onFilesSelected }
      >
        {
          this.props.children
            ? this.props.children
            : <span>{ elementProps.multiple ? text.selectFiles : text.selectFile }</span>
        }
      </StyleableElement>
    )
  }

  _resetInput() {
    this.setState({ key: newKey() })
  }
}

FileInput.propTypes = {
  text: PropTypes.shape({
    selectFile: PropTypes.string,
    selectFiles: PropTypes.string
  }),
  author: PropTypes.number.isRequired,
  entity: PropTypes.number.isRequired,
  uploader: PropTypes.object.isRequired
}

FileInput.defaultProps = {
  text: {
    selectFile: 'Select a File',
    selectFiles: 'Select Files'
  }
}


const onFilesSelected = function(onChangeEvent) {
  const { author, entity } = this.props
  const params = { author, entity }
  this.props.uploader.methods.addFiles(onChangeEvent.target, params)
  this._resetInput()
}

const newKey = () => Date.now()

export default FileInput
