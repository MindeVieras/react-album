import React from 'react'
import { WrappedFieldProps } from 'redux-form'
import Form, { FormItemProps } from 'antd/lib/form'
import Switch, { SwitchProps } from 'antd/lib/switch'

/**
 * Switch input props.
 */
interface ISwitchInputProps extends WrappedFieldProps {
  readonly checkedValue: string | number | boolean
  readonly uncheckedValue: string | number | boolean
  readonly formItemProps?: FormItemProps
  readonly switchProps?: SwitchProps
}

export const SwitchInput = ({
  input,
  meta,
  checkedValue,
  uncheckedValue,
  formItemProps,
  switchProps,
}: ISwitchInputProps) => {
  // Check for a field validation error.
  const hasError = meta.touched && meta.invalid
  const onChange = (checked: boolean) => {
    input.onChange(checked ? checkedValue : uncheckedValue)
  }
  return (
    <Form.Item
      validateStatus={hasError ? 'error' : 'success'}
      hasFeedback={hasError}
      help={hasError && meta.error}
      {...formItemProps}
    >
      <Switch onChange={onChange} {...switchProps} />
    </Form.Item>
  )
}
