
import  React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { IoUpload } from 'react-icons/lib/io'

import FileInput from '../Albums/Info/Media/Partials/file-input'
import { albumsActions, footerActions } from '../../../_actions'

class UploadMedia extends Component {
  
  render() {
    const { type, uploader } = this.props
    return (
      <FileInput
        uploader={ uploader }
        multiple={ true }
        btn_type={ type }
      />
    )
  }
}

UploadMedia.propTypes = {
  uploader: PropTypes.object.isRequired,
  type: PropTypes.string
}

UploadMedia.defaultProps = {
  type: 'info'
}

export default connect()(UploadMedia)
