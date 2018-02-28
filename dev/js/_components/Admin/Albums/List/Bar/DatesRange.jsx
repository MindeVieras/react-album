
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Range } from 'rc-slider'
import moment from 'moment'

import { albumsActions, utilsActions } from '../../../../../_actions'

class DatesRange extends Component {
  constructor(props) {
    super(props)

    this.onAfterChange = this.onAfterChange.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange(range) {
    const { dates, dispatch } = this.props
    let start_step = Math.round((dates.length - 1) * range[0]) / 100
    let end_step = Math.round((dates.length - 1) * range[1]) / 100
    dispatch(utilsActions.setAdminSetting('list_filter_start_date', dates[start_step]))
    dispatch(utilsActions.setAdminSetting('list_filter_end_date', dates[end_step]))
  }

  onAfterChange(range) {
    const { dates, dispatch } = this.props
    let start_step = Math.round((dates.length - 1) * range[0]) / 100
    let end_step = Math.round((dates.length - 1) * range[1]) / 100

    dispatch(utilsActions.saveAdminSetting('list_filter_start_date', dates[start_step]))
    dispatch(utilsActions.saveAdminSetting('list_filter_end_date', dates[end_step]))
    dispatch(albumsActions.getList(dates[start_step], dates[end_step]))
  }

  render() {
    const { dates, start_date, end_date } = this.props    
    let step = 1
    let defaultStart = 0
    let defaultEnd = 100
    if (dates.length > 1) {
      step = 100 / (dates.length - 1)
      defaultStart = (dates.indexOf(start_date)) * step
      defaultEnd = (dates.indexOf(end_date)) * step
      // console.log(defaultStart, defaultEnd)
    }

    return (
      <div>
        <Range
          step={ step }
          defaultValue={ [defaultStart, defaultEnd] }
          onChange={ this.onChange }
          onAfterChange={ this.onAfterChange }
        />
        <div className="dates">
          <span className="start">{ start_date }</span>
          <span className="end">{ end_date }</span>
        </div>
      </div>
    )
  }
}

DatesRange.propTypes = {
  dates: PropTypes.array.isRequired,
  start_date: PropTypes.string,
  end_date: PropTypes.string
}

DatesRange.defaultProps = {
  start_date: moment().subtract(1, 'years').format('YYYY-M-D'),
  end_date: moment().format('YYYY-M-D')
}

export default connect()(DatesRange)
