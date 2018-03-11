
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Popup from 'react-popup'
import { IoCalendar } from 'react-icons/lib/io'

import Picker from './Picker'
import TimeAgo from '../TimeAgo'

class Dates extends Component {
  
  handleClick() {
    const content = <Picker {...this.props} />

    Popup.create({
      title: 'Edit album date',
      content,
      className: 'datetime-picker-popup'
    })
  }
  
  render() {
    const { start_date, end_date } = this.props
    const date = moment(start_date).format('YYYY-MM-DD')
    return (
      <div className="dates-wrapper">
        <div className="date">
          { date }
        </div>
        <TimeAgo start_date={ start_date } />
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
  end_date: PropTypes.string.isRequired
}

export default Dates
