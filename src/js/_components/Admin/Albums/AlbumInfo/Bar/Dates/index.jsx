
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Popup from 'react-popup'
import { IoCalendar } from 'react-icons/lib/io'

import Picker from './Picker'
import TimeAgo from '../TimeAgo'

class Dates extends Component {
  
  handleClick() {
    const { t } = this.context
    const content = <Picker {...this.props} />

    Popup.create({
      title: t('Edit album date'),
      content,
      className: 'datetime-picker-popup'
    })
  }
  
  render() {
    const { start_date, end_date, locale } = this.props
    const date = moment(start_date).format('YYYY-MM-DD')
    return (
      <div className="dates-wrapper">
        <div className="date">
          { date }
        </div>
        <TimeAgo start_date={ start_date } locale={ locale } />
        <div className="buttons">
          <div
            className="btn btn-xs btn-info"
            onClick={ () => this.handleClick() }
          >
            <IoCalendar />
          </div>
        </div>
      </div>
    )
  }
}


Dates.propTypes = {
  album_id: PropTypes.number.isRequired,
  start_date: PropTypes.string.isRequired,
  end_date: PropTypes.string.isRequired,
  locale: PropTypes.string
}

Dates.defaultProps = {
  locale: 'en'
}

Dates.contextTypes = {
  t: PropTypes.func
}

export default Dates
