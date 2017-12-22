
import React from 'react'
import PropTypes from 'prop-types'

import { RingLoader } from 'react-spinners'

const Spinner = ({ type, size }) => {  
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

Spinner.propTypes = {
  type: PropTypes.string,
  size: PropTypes.number
}

Spinner.defaultProps = {
  type: 'primary',
  size: 70
}
export default Spinner
