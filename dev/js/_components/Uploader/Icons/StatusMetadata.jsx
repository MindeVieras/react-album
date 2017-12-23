
import React from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

import { IoClipboard } from 'react-icons/lib/io'

const StatusMetadataIcon = ({ metadata }) => {
  // console.log(metadata)
  let status = ''
  let tipMsg = ''
  if (metadata.ack == 'ok') {
    status = 'success'
    tipMsg = 'Some metadata available'
  }
  else if (metadata.ack == 'err') {
    status = 'failed'
    tipMsg = metadata.msg
  }
  return (    
    <div
      className={ `icon ${ status }` }
      data-tip={ tipMsg }
    >
      <IoClipboard />
      <ReactTooltip />
    </div>
  )
}

StatusMetadataIcon.propTypes = {
  metadata: PropTypes.object
}

StatusMetadataIcon.defaultProps = {
  metadata: {}
}

export default StatusMetadataIcon
