import React from 'react'
import { WrappedFieldProps } from 'redux-form'
import Form, { FormItemProps } from 'antd/lib/form'
import Input, { InputProps } from 'antd/lib/input'

/**
 * Text input props.
 */
interface ITextInputProps extends WrappedFieldProps {
  readonly formItemProps?: FormItemProps
  readonly inputProps?: InputProps
}

export const TextInput = ({ input, meta, formItemProps, inputProps }: ITextInputProps) => {
  // Check for a field validation error.
  const hasError = meta.touched && meta.invalid
  // Check field if type is 'password'.
  const isPassword = inputProps?.type === 'password'

  return (
    <Form.Item
      validateStatus={hasError ? 'error' : 'success'}
      hasFeedback={hasError}
      help={hasError && meta.error}
      {...formItemProps}
    >
      {/* Render password field if type is 'password'. */}
      {isPassword ? (
        <Input.Password {...input} {...inputProps} />
      ) : (
        // Otherwise render normal input field.
        <Input {...input} {...inputProps} />
      )}
    </Form.Item>
  )
}
