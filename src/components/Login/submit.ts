import { SubmissionError } from 'redux-form'

import { IFormLoginValues } from './LoginForm'
import { authService, ServiceResponseStatus } from '../../services'
import { history } from '../../helpers'

/**
 * Login form submit handler.
 *
 * @param {IFormLoginValues} values
 *   Login form values.
 */
function submit(values: IFormLoginValues) {
  const { username, password, recaptcha } = values
  return authService.login(username, password).then((res) => {
    const { status, message, errors } = res

    // Handle recaptcha error.
    if (!recaptcha) {
      // Throw submission error if recaptcha could not be verified.
      throw new SubmissionError({ _error: 'Cannot validate reCAPTCHA' })
    }

    // Handle client errors.
    if (status === ServiceResponseStatus.clientError) {
      // Throw submission errors to redux form fields.
      throw new SubmissionError({ _error: message, ...errors })
    }

    // Handle success.
    if (status === ServiceResponseStatus.success) {
      history.push('/')
    }
  })
}

export default submit
