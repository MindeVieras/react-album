
import React from 'react'
import PropTypes from 'prop-types'
import Marquee from 'react-text-marquee'

const Filename = ({ filename }) => {
  return (
    <div className="filename">
      <Marquee leading={ 500 } loop={ true } trailing={ 500 } text={ filename } />
    </div>
  )
}

Filename.propTypes = {
  filename: PropTypes.string
}

Filename.defaultProps = {
  filename: ''
}

export default Filename
