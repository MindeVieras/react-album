
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
  }

  onAfterChange(range) {
    const { dates, dispatch } = this.props

    let start_step = Math.floor((dates.length - 1) * range[0]) / 100
    let end_step = Math.floor((dates.length - 1) * range[1]) / 100

    dispatch(utilsActions.saveAdminSetting('list_filter_start_date', dates[start_step]))
    dispatch(utilsActions.saveAdminSetting('list_filter_end_date', dates[end_step]))
    dispatch(albumsActions.getList(dates[start_step], dates[end_step]))
  }

  render() {
    const { dates, start_date, end_date } = this.props
    dates.sort(function(a, b){
      return moment(a, 'YYYY-M-D').diff(moment(b, 'YYYY-M-D'))
    })
    let sd = dates[0]
    let ed = dates.slice(-1).pop()
    
    let step = 1
    let defaultStart = 0
    let defaultEnd = 100
    if (dates.length > 1) {
      step = 100 / (dates.length - 1)
      defaultStart = dates.indexOf(start_date)
    }
    // console.log(dates)
    console.log(defaultStart)
    return (
      <div>
        <Range
          step={ step }
          defaultValue={ [defaultStart, defaultEnd] }
          onAfterChange={ this.onAfterChange }
        />
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
