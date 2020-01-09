import React from 'react'
import { connect } from 'react-redux'
import { WrappedFieldProps } from 'redux-form'
import ReCAPTCHA from 'react-google-recaptcha'

import { config } from '../../../helpers'
import { IStoreState } from '../../../reducers'

/**
 * Recaptcha custom props.
 */
interface IRecaptchaFieldProps extends WrappedFieldProps {
  currentLanguage: string
}

/**
 * Google recaptcha component,
 * used as the redux form field.
 *
 * @param {IRecaptchaFieldProps} field
 *   Redux form field props
 *   and custom 'currentLanguage' prop.
 *
 * @returns {JSX.Element}
 *   Recaptcha component.
 */
const RecaptchaField = (field: IRecaptchaFieldProps): JSX.Element => {
  return (
    <ReCAPTCHA
      size="normal"
      hl={field.currentLanguage}
      sitekey={config.recaptchaSiteKey}
      onChange={field.input.onChange}
    />
  )
}

/**
 * Create props for the component from the redux store.
 *
 * @param {IStoreState} state
 *   Global redux state.
 */
const mapStateToProps = (state: IStoreState): { currentLanguage: string } => {
  return {
    currentLanguage: state.i18nState.lang,
  }
}

export default connect(mapStateToProps)(RecaptchaField)
