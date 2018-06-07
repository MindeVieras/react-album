
import React from 'react'
import PropTypes from 'prop-types'

import { RingLoader, ScaleLoader, ClipLoader } from 'react-spinners'

const Spinner = ({ type, size }) => {
  if (type === 'primary') {

    const centerSize = size / 2
    const style = {
      top: 'calc(50% - '+centerSize+'px)',
      left: 'calc(50% - '+centerSize+'px)'
    }
    return (
      <div className={`spinner ${type}`}>
        <div className="loader" style={style}>
          <RingLoader
            color={'#f6f6f5'}
            size={size}
          />
        </div>
      </div>
    )
  }
  else if (type === 'list-item') {

    const centerSize = size / 2
    const style = {
      position: 'absolute',
      top: 'calc(50% - '+centerSize+'px)',
      left: 'calc(50% - '+centerSize+'px)'
    }
    return (
      <div className={`spinner ${type}`}>
        <div className="loader" style={style}>
          <ScaleLoader
            color={'#f6f6f5'}
            height={size}
          />
        </div>
      </div>
    )
  }
  else if (type === 'thumbnail') {
    const centerSize = size / 2
    const style = {
      position: 'absolute',
      top: 'calc(50% - '+centerSize+'px)',
      left: 'calc(50% - '+centerSize+'px)'
    }
    return (
      <div className={`spinner ${type}`}>
        <div className="loader" style={style}>
          <ClipLoader
            color={'#f6f6f5'}
            size={size}
          />
        </div>
      </div>
    )
  }
  
}

Spinner.propTypes = {
  type: PropTypes.string,
  size: PropTypes.number
}

Spinner.defaultProps = {
  type: 'primary',
  size: 70
}
export default Spinner
