import React from 'react'
import { WrappedFieldProps } from 'redux-form'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

interface ISelectInputProps extends WrappedFieldProps {
  label?: string
}

export const SelectInput = (field: ISelectInputProps, ctx: any) => {
  return (
    <FormControl>
      {field.label && <InputLabel id="demo-simple-select-label">{field.label}</InputLabel>}
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={10}
        // onChange={handleChange}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  )
}
