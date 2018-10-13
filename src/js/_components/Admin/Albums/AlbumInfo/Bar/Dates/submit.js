
import { SubmissionError } from 'redux-form'

// import { userActions } from 'Actions'
// import { userService } from 'Services'
import { history } from 'Helpers'

function submit(values, dispatch, props) {
  console.log(values)
  // console.log(dispatch)
  // console.log(props)
  // return userService.create(values)
  //   .then(res => {

  //     const { ack, user, errors } = res

  //     if (ack == 'ok') {

  //       dispatch(userActions.create(user))

  //       // Redirect to new user
  //       history.push('/admin/users/' + user.username)
  //     }

  //     else if (ack == 'err' && errors)
  //       // trow submision errors to redux form fields
  //       throw new SubmissionError(errors)
  //   })
}

export default submit
