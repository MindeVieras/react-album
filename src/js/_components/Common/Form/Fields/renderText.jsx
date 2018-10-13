
import React from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'

const renderText = ({input, label, type, meta: {touched, error, invalid}, ...otherProps}, ctx) => {

  const { t } = ctx
  const translatedError = t(error)

  return (
    <TextField
      type={ type }
      label={ label }
      error={ touched && invalid }
      helperText={ touched && translatedError }
      { ...input }
      { ...otherProps }
    />

  )
}

renderText.contextTypes = {
  t: PropTypes.func
}

renderText.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  meta: PropTypes.object
}

renderText.defaultProps = {
  type: 'text',
  meta: {},
  margin: 'normal',
  fullWidth: true
}

export default renderText
