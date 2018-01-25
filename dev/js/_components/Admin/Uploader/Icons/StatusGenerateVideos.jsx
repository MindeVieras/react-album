
import React from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import uuidv4 from 'uuid/v4'

import { ScaleLoader } from 'react-spinners'
import { IoVideocamera } from 'react-icons/lib/io'

const StatusGenerateVideosIcon = ({ videos }) => {
  if (videos.ack == 'ok') {
    const tooltipId = uuidv4()
    return (    
      <div
        className="icon success"
        data-tip
        data-for={ tooltipId }
      >
        <IoVideocamera />
        <ReactTooltip id={ tooltipId }>
          Videos generated
        </ReactTooltip>
      </div>
    )
  }
  else if (videos.ack == 'loading') {
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
  else if (videos.ack == 'err') {
    return (    
      <div
        className="icon failed"
        data-tip={ videos.msg }
      >
        <IoVideocamera />
        <ReactTooltip />
      </div>
    )
  }
  else {
    return <span />
  }
}

StatusGenerateVideosIcon.propTypes = {
  videos: PropTypes.object
}

StatusGenerateVideosIcon.defaultProps = {
  videos: {}
}

export default StatusGenerateVideosIcon
