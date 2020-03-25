import React, { ReactNode } from 'react'
import { WrappedFieldProps } from 'redux-form'

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

import { UiComponentSize } from '../../../enums'

interface ITextInputProps extends WrappedFieldProps {
  label?: ReactNode | string
  type?: string
  size?: UiComponentSize
}

const styles = makeStyles((theme: Theme) =>
  createStyles({
    btnWrapper: {
      position: 'relative',
      margin: theme.spacing(2, 0),
    },
  }),
)

export const TextInput = ({ input, meta, size, ...field }: ITextInputProps) => {
  const classes = styles({})
  let className = classes.btnWrapper

  // Mui size 'small' is default.
  const MuiComponentSize = size === UiComponentSize.lg ? 'medium' : 'small'

  return (
    <TextField
      fullWidth={true}
      type="text"
      error={meta.touched && meta.invalid}
      helperText={meta.touched && meta.error}
      variant="outlined"
      size={MuiComponentSize}
      // color="primary"
      // margin="normal"
      inputProps={input}
      className={className}
      {...field}
    />
  )
}
