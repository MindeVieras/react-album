import React from 'react'
import { useSelector } from 'react-redux'
import { WrappedFieldProps } from 'redux-form'
import ReCAPTCHA from 'react-google-recaptcha'

import { config, Locale } from '../../../helpers'
import { IStoreState } from '../../../reducers'

/**
 * Recaptcha component props.
 */
interface IRecaptchaFieldProps extends WrappedFieldProps {}

/**
 * Google recaptcha component,
 * used as the redux form field.
 *
 * @param {IRecaptchaFieldProps} props
 *   Redux form field props
 *   and custom 'currentLanguage' prop.
 *
 * @returns {JSX.Element}
 *   Recaptcha component.
 */
export const RecaptchaInput = (props: IRecaptchaFieldProps): JSX.Element => {
  const currentLocale = useSelector((state: IStoreState) => state.i18n.locale)
  return (
    <ReCAPTCHA
      size="normal"
      hl={Locale.getLanguageCodeFromLocaleCode(currentLocale)}
      sitekey={config.recaptchaSiteKey}
      onChange={props.input.onChange}
    />
  )
}
