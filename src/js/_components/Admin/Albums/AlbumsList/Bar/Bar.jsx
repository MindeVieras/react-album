
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'

import grey from '@material-ui/core/colors/grey'

import DatesRange from './DatesRange'

import { albumsActions } from 'Actions'

const styles = theme => ({
  bar_wrapper: {
    paddingTop: theme.spacing.unit * 0.5,
    paddingBottom: theme.spacing.unit * 0.5,
    paddingLeft: theme.spacing.unit * 1.5,
    paddingRight: theme.spacing.unit * 1.5,
    borderBottom: `1px solid ${grey[800]}`
  }
})

class Bar extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount(){
    const { dispatch } = this.props
    dispatch(albumsActions.getListDates())
  }

  render() {
    const { classes, dates, start_date, end_date } = this.props
    return (
      <div className={ classes.bar_wrapper }>
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
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
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

export default connect(mapStateToProps)(withStyles(styles)(Bar))
