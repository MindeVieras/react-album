
import React from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import uuidv4 from 'uuid/v4'

import { ScaleLoader } from 'react-spinners'
import { IoAperture } from 'react-icons/lib/io'

const StatusRekognitionLabelsIcon = ({ rekognition_labels }) => {
  if (rekognition_labels.ack == 'ok') {
    const tooltipId = uuidv4()
    return (    
      <div
        className="icon success"
        data-tip
        data-for={ tooltipId }
      >
        <IoAperture />
        <ReactTooltip id={ tooltipId }>
          <ul>
            {
              Object.keys(rekognition_labels).sort().map((key, i) => {
                if (key != 'ack') {
                  let confidence = rekognition_labels[key]
                  return (
                    <li key={ i }>{ key } { Math.trunc(confidence) }%</li>
                  )
                }
              })
            }
          </ul>
        </ReactTooltip>
      </div>
    )
  }
  else if (rekognition_labels.ack == 'loading') {
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
  else if (rekognition_labels.ack == 'err') {
    return (    
      <div
        className="icon failed"
        data-tip={ rekognition_labels.msg }
      >
        <IoAperture />
        <ReactTooltip />
      </div>
    )
  }
}

StatusRekognitionLabelsIcon.propTypes = {
  rekognition_labels: PropTypes.object
}

StatusRekognitionLabelsIcon.defaultProps = {
  rekognition_labels: {}
}

export default StatusRekognitionLabelsIcon
