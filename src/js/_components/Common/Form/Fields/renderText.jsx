
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

const renderText = ({input, autoFocus, label, type, meta: {touched, error, invalid}}) => {

  console.log()
  return (
    <TextField
      type={ type }
      label={ label }
      error={ touched && invalid }
      helperText={ touched && error }
      margin="normal"
      fullWidth={ true }
      autoFocus={ autoFocus }
      { ...input }
    />

  )
}

renderText.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  autoFocus: PropTypes.bool,
  meta: PropTypes.object
}

renderText.defaultProps = {
  autoFocus: false,
  type: 'text',
  meta: {}
}

export default renderText
