
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import filesize from 'filesize'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import grey from '@material-ui/core/colors/grey'

import Locations from './Locations'
import Dates from './Dates'

const styles = theme => ({
  bar_wrapper: {
    backgroundColor: grey[800],
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `flex-end`,
    paddingTop: theme.spacing.unit / 2,
    paddingBottom: theme.spacing.unit / 2,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 22
  },
  flex_left: {
    display: `flex`,
    flexDirection: `column`,
    alignItems: `flex-start`
  },
  flex_right: {
    display: `flex`,
    flexDirection: `column`,
    alignItems: `flex-end`
  },
  count_text: {
    color: theme.palette.common.white
  }
})

const Bar = ({ classes, album_id, start_date, end_date, locale, counter, total_filesize }) => {

  return (
    <div className={ classes.bar_wrapper }>
      <div className={ classes.flex_left }>
        <Dates
          album_id={ album_id }
          start_date={ start_date }
          end_date={ end_date }
          locale={ locale }
        />

        <Locations album_id={ album_id } />
      </div>

      <div className={ classes.flex_right }>

        <Typography
          variant="caption"
          className={ classes.count_text }
        >
          { counter } files
        </Typography>

        <Typography
          variant="caption"
          className={ classes.count_text }
        >
          { filesize(total_filesize) }
        </Typography>

      </div>

    </div>
  )
}

Bar.propTypes = {
  classes: PropTypes.object.isRequired,
  album_id: PropTypes.number.isRequired,
  start_date: PropTypes.string.isRequired,
  end_date: PropTypes.string.isRequired,
  counter: PropTypes.number,
  total_filesize: PropTypes.number,
  locale: PropTypes.string
}

Bar.defaultProps = {
  counter: 0,
  total_filesize: 0,
  locale: 'en'
}

function mapStateToProps(state) {
  const { i18nState } = state
  return {
    locale: i18nState.lang
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Bar))
