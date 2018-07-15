
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'

import Locations from './Locations'
import Dates from './Dates'

const styles = theme => ({
  bar_wrapper: {
    display: `flex`,
    flexDirection: `column`,
    alignItems: `flex-start`,
    paddingTop: theme.spacing.unit / 2,
    paddingBottom: theme.spacing.unit / 2,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit
  }
})

const Bar = ({ classes, album_id, start_date, end_date, locale }) => {

  return (
    <div className={ classes.bar_wrapper }>

      <Dates
        album_id={ album_id }
        start_date={ start_date }
        end_date={ end_date }
        locale={ locale }
      />

      <Locations album_id={ album_id } />

    </div>
  )
}

Bar.propTypes = {
  classes: PropTypes.object.isRequired,
  album_id: PropTypes.number.isRequired,
  start_date: PropTypes.string.isRequired,
  end_date: PropTypes.string.isRequired,
  locale: PropTypes.string
}

Bar.defaultProps = {
  locale: 'en'
}

function mapStateToProps(state) {
  const { i18nState } = state
  return {
    locale: i18nState.lang
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Bar))
