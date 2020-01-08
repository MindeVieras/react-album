import React from 'react'
import PropTypes from 'prop-types'
import { WrappedFieldProps } from 'redux-form'

import TextField from '@material-ui/core/TextField'

interface ITextInputProps extends WrappedFieldProps {
  label?: string
  type?: string
}

export const TextInput = (field: ITextInputProps, ctx: any) => {
  const { t } = ctx
  return (
    <TextField
      fullWidth={true}
      type="text"
      error={field.meta.touched && field.meta.invalid}
      helperText={field.meta.touched && t(field.meta.error)}
      {...field.input}
      {...field}
    />
  )
}

TextInput.contextTypes = {
  t: PropTypes.func.isRequired,
}
