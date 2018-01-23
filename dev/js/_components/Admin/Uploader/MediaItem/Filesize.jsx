
import React from 'react'
import PropTypes from 'prop-types'

const Filesize = (props) => {

  const size = props.filesize
  const units = props.units
  const { formattedSize, formattedUnits } = formatSizeAndUnits({ size, units })

  return (
    <span className="filesize">
      <span className="filesize-value">
        { formattedSize }
      </span>
      <span className="filesize-separator"> </span>
      <span className="filesize-unit">
        { formattedUnits }
      </span>
    </span>
  )
}

Filesize.propTypes = {
  units: PropTypes.shape({
    byte: PropTypes.string,
    kilobyte: PropTypes.string,
    megabyte: PropTypes.string,
    gigabyte: PropTypes.string,
    terabyte: PropTypes.string
  }),
  filesize: PropTypes.number
}

Filesize.defaultProps = {
  units: {
    byte: 'B',
    kilobyte: 'KB',
    megabyte: 'MB',
    gigabyte: 'GB',
    terabyte: 'TB'
  },
  filesize: 0
}

const formatSizeAndUnits = ({ size, units }) => {
  let formattedSize,
    formattedUnits

  if (size < 1e+3) {
    formattedSize = size
    formattedUnits = units.byte
  }
  else if (size >= 1e+3 && size < 1e+6) {
    formattedSize = (size / 1e+3).toFixed(2)
    formattedUnits = units.kilobyte
  }
  else if (size >= 1e+6 && size < 1e+9) {
    formattedSize = (size / 1e+6).toFixed(2)
    formattedUnits = units.megabyte
  }
  else if (size >= 1e+9 && size < 1e+12) {
    formattedSize = (size / 1e+9).toFixed(2)
    formattedUnits = units.gigabyte
  }
  else {
    formattedSize = (size / 1e+12).toFixed(2)
    formattedUnits = units.terabyte
  }

  return { formattedSize, formattedUnits }
}

export default Filesize
