import { Dispatch } from 'redux'
import { SubmissionError } from 'redux-form'

import { IFormLoginValues } from './LoginForm'
import { authService, ResponseStatus } from '../../services'
import { history } from '../../helpers'
import { authSet, IActionAuthSet } from '../../actions'

/**
 * Login form submit handler.
 *
 * @param {IFormLoginValues} values
 *   Login form values.
 */
const submit = async (values: IFormLoginValues, dispatch: Dispatch<IActionAuthSet>) => {
  const { username, password, recaptcha } = values

  // Handle recaptcha error before making a request to the API.
  if (!recaptcha) {
    // Throw submission error if recaptcha could not be verified.
    throw new SubmissionError({ _error: 'Cannot validate reCAPTCHA' })
  }

  const { status, message, errors, data } = await authService.login(username, password)

  // Handle client errors.
  if (status === ResponseStatus.clientError) {
    // Throw submission errors to redux form fields.
    throw new SubmissionError({ _error: message, ...errors })
  }

  // Handle success.
  if (status === ResponseStatus.success && data) {
    // @ts-ignore
    dispatch(authSet(data))
    history.push('/')
  }
}

export default submit
