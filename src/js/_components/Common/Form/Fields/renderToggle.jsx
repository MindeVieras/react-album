
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Select from 'react-select'

import { withStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
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
  }
})

const renderToggle = (props) => {

  const {
    classes, margin, fullWidth, label,
    input, className,
    onLabel, offLabel,
    meta
  } = props

  const { name, value, onChange } = input
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
        <label className={ classes.labelRoot } >
          { label }
        </label>
      }

      <FormControlLabel
        control={
          <Switch
            checked={ value ? true : false }
            onChange={ onChange }
            color="primary"
          />
        }
        label={ value ? onLabel : offLabel }
      />

    </div>
  )
}

renderToggle.propTypes = {
  classes: PropTypes.object.isRequired,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
  }).isRequired,
  meta: PropTypes.shape({
    valid: PropTypes.bool.isRequired,
    error: PropTypes.string
  }),
  label: PropTypes.string,
  className: PropTypes.string,
  margin: PropTypes.string,
  fullWidth: PropTypes.bool,
  onLabel: PropTypes.string,
  offLabel: PropTypes.string
}

renderToggle.defaultProps = {
  meta: PropTypes.shape({
    error: null
  }),
  label: null,
  className: '',
  margin: 'normal',
  fullWidth: false,
  onLabel: 'On',
  offLabel: 'Off'
}

export default withStyles(styles)(renderToggle)
