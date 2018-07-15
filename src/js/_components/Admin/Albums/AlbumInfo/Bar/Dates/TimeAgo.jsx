
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

class TimeAgo extends Component {

  render() {

    const { start_date, locale } = this.props
    moment.locale(locale)
    let ago = moment(start_date).fromNow()

    return (
      <Fragment>
        { ago }
      </Fragment>
    )
  }
}

TimeAgo.propTypes = {
  start_date: PropTypes.string.isRequired,
  locale: PropTypes.string
}

TimeAgo.defaultProps = {
  locale: 'en'
}

export default TimeAgo
