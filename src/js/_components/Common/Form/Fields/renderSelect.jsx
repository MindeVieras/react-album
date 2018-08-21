
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

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

const renderSelect = (props) => {

  const {
    classes, margin, fullWidth, label,
    input , options, multi, className,
    meta
  } = props

  const { name, value, onBlur, onChange, onFocus } = input
  const transformedValue = transformValue(value, options, multi)
  const { active, valid, error } = meta

  let rootClass = classes.root
  if (margin === 'dense')
    rootClass = classes.rootDense
  if (margin === 'normal')
    rootClass === rootNormal

  return (
    <div
      className={classNames(
        className,
        classes.root,
        rootClass,
        { [classes.fullWidth]: fullWidth }
      )}
    >
      {label &&
        <label
          className={classNames(
            classes.labelRoot,
            { [classes.labelError]: !valid },
            { [classes.labelActive]: active }
          )}
        >
          { label }
        </label>
      }

      <Select
        valueKey="value"
        name={ name }
        value={ transformedValue }
        multi={ multi }
        options={ options }
        onChange={multi
          ? multiChangeHandler(onChange)
          : singleChangeHandler(onChange)
        }
        onBlur={ () => onBlur(value) }
        onFocus={ onFocus }
        className={classNames(
          classes.selectRoot,
          { [classes.fullWidth]: fullWidth },
          { [classes.selectWithLabel]: label }
        )}
      />

      {!valid &&
        <Typography
          variant="caption"
          align="left"
          component="p"
          className={classNames(
            classes.helperRoot,
            { [classes.labelError]: !valid },
            { [classes.helperDense]: margin === 'dense' }
          )}
        >
          { error }
        </Typography>
      }

    </div>
  )
}

/**
 * onChange from Redux Form Field has to be called explicity.
 */
function singleChangeHandler(func) {
  return function handleSingleChange(value) {
    func(value ? value.value : '')
  }
}

/**
 * onBlur from Redux Form Field has to be called explicity.
 */
function multiChangeHandler(func) {
  return function handleMultiHandler(values) {
    func(values.map(value => value.value))
  }
}

/**
 * For single select, Redux Form keeps the value as a string, while React Select
 * wants the value in the form { value: "grape", label: "Grape" }
 *
 * * For multi select, Redux Form keeps the value as array of strings, while React Select
 * wants the array of values in the form [{ value: "grape", label: "Grape" }]
 */
function transformValue(value, options, multi) {
  if (multi && typeof value === 'string') return []

  const filteredOptions = options.filter(option => {
    return multi
      ? value.indexOf(option.value) !== -1
      : option.value === value
  })

  return multi ? filteredOptions : filteredOptions[0]
}

renderSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    valid: PropTypes.bool.isRequired,
    error: PropTypes.string
  }),
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  multi: PropTypes.bool,
  className: PropTypes.string,
  margin: PropTypes.string,
  fullWidth: PropTypes.bool
}

renderSelect.defaultProps = {
  meta: PropTypes.shape({
    error: null
  }),
  label: null,
  multi: false,
  className: '',
  margin: 'normal',
  fullWidth: true
}

export default withStyles(styles)(renderSelect)
