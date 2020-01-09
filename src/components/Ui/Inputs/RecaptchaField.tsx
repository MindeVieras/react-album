import React from 'react'
import { connect } from 'react-redux'
import { WrappedFieldProps } from 'redux-form'
import ReCAPTCHA from 'react-google-recaptcha'

import { recaptchaSiteKey } from '../../../helpers'
import { IStoreState } from '../../../reducers'

interface IRecaptchaFieldProps extends WrappedFieldProps {
  currentLanguage: string
}

const RecaptchaField = (field: IRecaptchaFieldProps) => {
  return (
    <ReCAPTCHA
      size="normal"
      hl={field.currentLanguage}
      sitekey={recaptchaSiteKey}
      onChange={field.input.onChange}
    />
  )
}

const mapStateToProps = (state: IStoreState) => {
  return {
    currentLanguage: state.i18nState.lang,
  }
}

export default connect(mapStateToProps)(RecaptchaField)
