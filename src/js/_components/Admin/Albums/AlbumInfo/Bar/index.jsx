
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Locations from './Locations'
import Dates from './Dates'

const Bar = ({ album_id, name, start_date, end_date, locale }) => {

  return (
    <div className="album-bar">
      <Dates
        album_id={ album_id }
        start_date={ start_date }
        end_date={ end_date }
        locale={ locale }
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
  end_date: PropTypes.string.isRequired,
  locale: PropTypes.string
}

Bar.defaultProps = {
  locale: 'en'
}

function mapStateToProps(state) {
  const { i18nState } = state
  return {
    locale: i18nState.lang
  }
}

export default connect(mapStateToProps)(Bar)
