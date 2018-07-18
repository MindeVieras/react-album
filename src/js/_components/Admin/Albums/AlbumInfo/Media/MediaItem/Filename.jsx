
import React from 'react'
import PropTypes from 'prop-types'
import Marquee from 'react-text-marquee'

import Typography from '@material-ui/core/Typography'

const Filename = ({ className, filename, width }) => {
  return (
    <Typography
      className={ className }
      style={{ width }}
      variant="body2"
    >
      <Marquee leading={ 500 } loop={ true } trailing={ 500 } text={ filename } />
    </Typography>
  )
}

Filename.propTypes = {
  className: PropTypes.string,
  filename: PropTypes.string,
  width: PropTypes.number
}

Filename.defaultProps = {
  className: '',
  filename: '',
  width: 175
}

export default Filename
