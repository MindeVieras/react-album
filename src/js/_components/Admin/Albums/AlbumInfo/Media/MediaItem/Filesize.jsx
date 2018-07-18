
import React from 'react'
import PropTypes from 'prop-types'
import fsize from 'filesize'

import Typography from '@material-ui/core/Typography'

const Filesize = ({ className, filesize }) => {

  return (
    <Typography className={ className }>
      { fsize(filesize) }
    </Typography>
  )
}

Filesize.propTypes = {
  className: PropTypes.string,
  filesize: PropTypes.number
}

Filesize.defaultProps = {
  className: '',
  filesize: 0
}

export default Filesize
