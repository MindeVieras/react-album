
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import moment from 'moment'
import Datetime from 'react-datetime'
import DatetimeRangePicker from 'react-datetime-range-picker'

import TextField from '@material-ui/core/TextField'

import Select from 'react-select'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    display: `inline-flex`,
    flexDirection: `column`,
    border: 0,
    padding: 0,
    position: `relative`,
    minWidth: 0
  },
  rootNormal: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit
  },
  rootDense: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit / 2
  },
  fullWidth: {
    width: `100%`
  },
  labelRoot: {
    position: `absolute`,
    top: 0,
    left: 0,
    color: theme.palette.text.secondary,
    padding: 0,
    fontSize: `1rem`,
    fontFamily: theme.typography.fontFamily,
    lineHeight: 1,
    transform: `translate(0, 1.5px) scale(0.75)`,
    transformOrigin: `top left`
  },
  labelActive: {
    color: theme.palette.primary.light
  },
  labelError: {
    color: theme.palette.error.main
  },
  selectRoot: {
    color: `#fff`,
    display: `inline-flex`,
    position: `relative`,
    fontSize: `1rem`,
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    lineHeight: `1.1875em`
  },
  selectWithLabel: {
    marginTop: theme.spacing.unit * 2
  },
  helperRoot: {
    margin: 0,
    marginTop: theme.spacing.unit,
    minHeight: `1em`,
    lineHeight: `1em`
  },
  helperDense: {
    marginTop: theme.spacing.unit / 2
  }
})

const renderDateRange = props => {

  const {
    classes, label,
    start_date, end_date,
    input, className,
    meta, ...otherProps
  } = props

  const { name, value, onBlur, onChange, onFocus } = input
  const { active, touched, error } = meta
  console.log(start_date)
  console.log(end_date)
  return (
    <div>

      {/*       <Datetime */}
      {/*         open={ true } */}
      {/*         value={ start_date } */}
      {/*         defaultValue={ start_date } */}
      {/*         dateFormat={ 'YYYY-MM-DD' } */}
      {/*         timeFormat={ 'HH:mm:ss' } */}
      {/*         onChange={ () => console.log('datetme change') } */}
      {/*         renderInput={ renderStartInput } */}
      {/*       /> */}
      {/*  */}
      {/*       <Datetime */}
      {/*         open={ true } */}
      {/*         value={ end_date } */}
      {/*         defaultValue={ end_date } */}
      {/*         dateFormat={ 'YYYY-MM-DD' } */}
      {/*         timeFormat={ 'HH:mm:ss' } */}
      {/*         onChange={ () => console.log('datetme change') } */}
      {/*         renderInput={ renderEndInput } */}
      {/*       /> */}

      <DatetimeRangePicker
        onChange={ () => console.log('date range changed!') }
        startDate={ moment(start_date) }
        endDate={ moment(end_date) }
      />

    </div>
  )
}

function renderStartInput(props, openCalendar, closeCalendar) {
  return (
    <TextField
      type="text"
      label="Start date"
      { ...props }
    />
  )
}

function renderEndInput(props, openCalendar, closeCalendar) {
  return (
    <TextField
      type="text"
      label="End date"
      { ...props }
    />
  )
}

renderDateRange.propTypes = {
  classes: PropTypes.object.isRequired,
  start_date: PropTypes.string.isRequired,
  end_date: PropTypes.string.isRequired,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string
  }),
  label: PropTypes.string,
  className: PropTypes.string
}

renderDateRange.defaultProps = {
  meta: PropTypes.shape({
    touched: false,
    error: null
  }),
  label: null,
  className: ''
}

export default withStyles(styles)(renderDateRange)
