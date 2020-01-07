import React from 'react'
import { WrappedFieldProps } from 'redux-form'

import TextField from '@material-ui/core/TextField'

interface ITextInputProps extends WrappedFieldProps {
  label?: string
  type?: string
}

export const TextInput = (field: ITextInputProps) => {
  return (
    <TextField
      fullWidth={true}
      type="text"
      error={field.meta.touched && field.meta.invalid}
      helperText={field.meta.touched && field.meta.error}
      {...field.input}
      {...field}
    />
  )
}
