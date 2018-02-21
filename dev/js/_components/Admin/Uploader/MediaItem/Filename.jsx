
import React from 'react'
import PropTypes from 'prop-types'
import Marquee from 'react-text-marquee'

const Filename = ({ filename, width }) => {
  return (
    <div className="filename" style={{width: `${width}px`}}>
      <Marquee leading={ 500 } loop={ true } trailing={ 500 } text={ filename } />
    </div>
  )
}

Filename.propTypes = {
  filename: PropTypes.string,
  width: PropTypes.number
}

Filename.defaultProps = {
  filename: '',
  width: 175
}

export default Filename
