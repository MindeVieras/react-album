
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

const renderText = ({input, label, type, meta: {touched, error, invalid}}) => (

  <TextField
    type={ type }
    label={ label }
    error={ touched && invalid }
    helperText={ touched && error }
    margin="normal"
    fullWidth={ true }
    { ...input }
  />

)

renderText.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  meta: PropTypes.object
}

renderText.defaultProps = {
  type: 'text',
  meta: {}
}

export default renderText
