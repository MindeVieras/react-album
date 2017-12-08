
import React from 'react'
import { connect } from 'react-redux'

import { BeatLoader } from 'react-spinners'

import { userActions } from '../../_actions'

class LoginPage extends React.Component {
  constructor(props) {
    super(props)

    // reset login status
    this.props.dispatch(userActions.logout())

    this.state = {
      username: '',
      password: '',
      submitted: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit(e) {
    e.preventDefault()

    this.setState({ submitted: true })
    const { username, password } = this.state
    const { dispatch } = this.props
    if (username && password) {
      dispatch(userActions.login(username, password))
    }
  }

  render() {
    const { loggingIn, alert } = this.props
    const { username, password, submitted } = this.state
    return (
      <div id="login_wrapper">
        <div className="login-container">
          <form name="form" id="login_form" className="form-signin" onSubmit={this.handleSubmit}>

            <input
              type="text"
              id="username"
              placeholder="Username"
              className="form-control"
              name="username"
              value={username}
              onChange={this.handleChange}
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="form-control"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
            <button className="btn btn-lg btn-primary btn-block" id="login-button">Login</button>
            {loggingIn &&
              <BeatLoader />
            }

            {alert.message &&
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            }

          </form>

        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.auth
  const { alert } = state
  return {
    loggingIn,
    alert
  }
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage)
export { connectedLoginPage as LoginPage }
