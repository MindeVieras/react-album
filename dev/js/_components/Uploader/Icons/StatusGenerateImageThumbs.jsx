
import React from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import uuidv4 from 'uuid/v4'

import { ScaleLoader } from 'react-spinners'
import { IoImages } from 'react-icons/lib/io'

const StatusGenerateImageThumbsIcon = ({ thumbs }) => {
  if (thumbs.ack == 'ok') {
    const tooltipId = uuidv4()
    return (    
      <div
        className="icon success"
        data-tip
        data-for={ tooltipId }
      >
        <IoImages />
        <ReactTooltip id={ tooltipId }>
          Thumbnails generated
        </ReactTooltip>
      </div>
    )
  }
  else if (thumbs.ack == 'loading') {
    return (
      <div
        className="icon loading"
      >
        <ScaleLoader
          height={ 22 }
          width={ 1 }
          margin={ '1px' }
          color={'#f6f6f5'}
        />
      </div>
    )
  }
  else if (thumbs.ack == 'err') {
    return (    
      <div
        className="icon failed"
        data-tip={ thumbs.msg }
      >
        <IoImages />
        <ReactTooltip />
      </div>
    )
  }
}

StatusGenerateImageThumbsIcon.propTypes = {
  thumbs: PropTypes.object
}

StatusGenerateImageThumbsIcon.defaultProps = {
  thumbs: {}
}

export default StatusGenerateImageThumbsIcon
