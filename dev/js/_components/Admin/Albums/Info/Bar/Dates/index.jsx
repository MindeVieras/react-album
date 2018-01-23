
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Popup from 'react-popup'
import { IoCalendar, IoRefresh } from 'react-icons/lib/io'

import Picker from './Picker'

class Dates extends Component {
  
  handleClick() {
    const content = <Picker {...this.props} />

    Popup.create({
      title: 'Edit album date',
      content,
      className: 'datetime-picker'
    })
  }
  
  render() {
    const { start_date, end_date } = this.props
    const date = moment(start_date).format('YYYY-MM-DD HH:mm:ss')
    return (
      <div className="dates-wrapper">
        <div className="date">
          { date }
        </div>
        <div className="buttons">
          <div className="btn btn-xs btn-info">
            <IoCalendar onClick={ () => this.handleClick() } />
          </div>
          <div className="btn btn-xs btn-info">
            <IoRefresh onClick={ () => this.handleClick() } />
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
