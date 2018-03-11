
import React from 'react'
import PropTypes from 'prop-types'

import Locations from './Locations'
import Dates from './Dates'

const Bar = ({ album_id, name, start_date, end_date }) => {

  return (
    <div className="album-bar">
      <Dates
        album_id={ album_id }
        start_date={ start_date }
        end_date={ end_date }
      />
      <div className="left">
        <Locations album_id={ album_id } />
      </div>
    </div>
  )
}

Bar.propTypes = {
  album_id: PropTypes.number.isRequired,
  start_date: PropTypes.string.isRequired,
  end_date: PropTypes.string.isRequired
}

export default Bar
