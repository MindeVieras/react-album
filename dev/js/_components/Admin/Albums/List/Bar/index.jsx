
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import DatesRange from './DatesRange'

import { albumsActions } from '../../../../../_actions'

class Bar extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount(){
    const { dispatch } = this.props
    dispatch(albumsActions.getListDates())
  }

  render() {
    const { dates, start_date, end_date } = this.props
    return (
      <div className="filter-bar">
        {dates.loading &&
          <div>Loading...</div>
        }
        {dates.err &&
          <div>{dates.err}</div>
        }
        {dates.distinct_list &&
          <DatesRange
            dates={ dates.distinct_list }
            start_date={ start_date }
            end_date={ end_date }
          />
        }
      </div>
    )
  }
}

Bar.propTypes = {
  dates: PropTypes.object,
  start_date: PropTypes.string,
  end_date: PropTypes.string
}

function mapStateToProps(state) {
  const { settings, admin_albums } = state
  return {
    dates: admin_albums.dates,
    start_date: settings.admin.list_filter_start_date,
    end_date: settings.admin.list_filter_end_date,
  }
}

export default connect(mapStateToProps)(Bar)
