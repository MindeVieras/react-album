
import  React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { IoUpload } from 'react-icons/lib/io'

import FileInput from '../Uploader/Partials/file-input'
import { albumsActions, footerActions } from '../../../_actions'

class UploadMedia extends Component {
  
  render() {
    const { entity, entity_id, status, type, uploader } = this.props
    return (
      <FileInput
        uploader={ uploader }
        entity={ entity }
        entity_id={ entity_id }
        status={ status }
        multiple={ true }
        btn_type={ type }
      />
    )
  }
}

UploadMedia.propTypes = {
  entity: PropTypes.number.isRequired,
  entity_id: PropTypes.number.isRequired,
  uploader: PropTypes.object.isRequired,
  type: PropTypes.string
}

UploadMedia.defaultProps = {
  type: 'info'
}

export default connect()(UploadMedia)
