
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

class TimeAgo extends Component {

  render() {
    const { start_date } = this.props
    let ago = moment(start_date).fromNow()
    return (
      <div className="time-ago">
        { ago }
      </div>
    )
  }
}

TimeAgo.propTypes = {
  start_date: PropTypes.string.isRequired
}

export default TimeAgo
