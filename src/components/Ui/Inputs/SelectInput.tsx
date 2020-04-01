import React, { ReactNode } from 'react'
import { WrappedFieldProps } from 'redux-form'
import Form, { FormItemProps } from 'antd/lib/form'
import Select, { SelectProps } from 'antd/lib/select'

/**
 * Select option interface.
 */
interface ISelectOption {
  value: string
  name: ReactNode
}

/**
 * Select input props.
 */
interface ISelectInputProps extends WrappedFieldProps {
  readonly options?: ISelectOption[]
  readonly formItemProps?: FormItemProps
  readonly selectProps?: SelectProps<any>
}

export const SelectInput = ({
  input,
  meta,
  options,
  formItemProps,
  selectProps,
}: ISelectInputProps) => {
  // Check for a field validation error.
  const hasError = meta.touched && meta.invalid

  const selectOptions = options?.map((o) => {
    return (
      <Select.Option key={o.value} value={o.value}>
        {o.name}
      </Select.Option>
    )
  })

  return (
    <Form.Item
      validateStatus={hasError ? 'error' : 'success'}
      hasFeedback={hasError}
      help={hasError && meta.error}
      {...formItemProps}
    >
      <Select onChange={input.onChange} {...selectProps}>
        {selectOptions}
      </Select>
    </Form.Item>
  )
}
