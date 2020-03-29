import React from 'react'
import { WrappedFieldProps } from 'redux-form'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

interface ISelectInputProps extends WrappedFieldProps {
  label?: string
}

export const SelectInput = (props: ISelectInputProps) => {
  // console.log(props)
  return (
    <FormControl variant="outlined" size="medium" fullWidth={true}>
      {props.label && <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>}
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={10}
        // {...props.input}
        // onChange={handleChange}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  )
}
