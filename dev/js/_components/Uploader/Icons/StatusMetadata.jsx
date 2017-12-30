
import React from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import uuidv4 from 'uuid/v4'
import _ from 'lodash'

import { ScaleLoader } from 'react-spinners'
import { IoClipboard } from 'react-icons/lib/io'

const StatusMetadataIcon = ({ metadata }) => {
  if (metadata.ack == 'ok') {
    const tooltipId = uuidv4()
    return (    
      <div
        className="icon success"
        data-tip
        data-for={ tooltipId }
      >
        <IoClipboard />
        <ReactTooltip id={ tooltipId }>
          <ul>
            {
              Object.keys(metadata).sort().map((key, i) => {
                if (key != 'ack') {
                  let value = metadata[key]
                  return (
                    <li key={ i }><strong>{ _.startCase(_.toLower(key)) }:</strong> { value }</li>
                  )
                }
              })
            }
          </ul>
        </ReactTooltip>
      </div>
    )
  }
  else if (metadata.ack == 'loading') {
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
  else if (metadata.ack == 'err') {
    return (    
      <div
        className="icon failed"
        data-tip={ metadata.msg }
      >
        <IoClipboard />
        <ReactTooltip />
      </div>
    )
  }
}

StatusMetadataIcon.propTypes = {
  metadata: PropTypes.object
}

StatusMetadataIcon.defaultProps = {
  metadata: {}
}

export default StatusMetadataIcon
