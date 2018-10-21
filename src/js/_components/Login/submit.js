
import { SubmissionError } from 'redux-form'

import { userConstants } from 'Constants'
import { loginActions } from 'Actions'
import { loginService } from 'Services'
import { history } from 'Helpers'

function submit(values, dispatch) {

  const { username, password } = values

  return loginService.login(username, password)
    .then(res => {

      const { ack, data, errors } = res

      if (ack == 'ok') {

        let user = data

        dispatch(loginActions.login(user))

        // Redirect user to location
        if (user.access_level >= userConstants.USER_ACCESS_AUTHED) {
          history.push('/admin')
        } else {
          history.push('/')
        }
      }

      else if (ack == 'err' && errors)
        // trow submision errors to redux form fields
        throw new SubmissionError(errors)
    })
}

export default submit
