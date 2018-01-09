
import React from 'react'
import { connect } from 'react-redux'

import { BeatLoader } from 'react-spinners'

import { loginActions } from '../../_actions'

import '../../../scss/Login/main.scss'

class Login extends React.Component {
  constructor(props) {
    super(props)

    // reset login status
    props.dispatch(loginActions.logout())

    this.state = {
      username: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.usernameInput.focus()
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit(e) {
    e.preventDefault()

    const { username, password } = this.state
    if (username && password) {
      const { dispatch } = this.props
      dispatch(loginActions.login(username, password))
    }
  }

  render() {
    const { loading, error, msg } = this.props
    const { username, password } = this.state
    const errorClassName = error ? 'form-error' : ''
    const loadingClassName = loading ? 'loading' : ''
    return (
      <div id="login_wrapper">
        <div className="login-container">
          <form
            id="login_form"
            className={`form-signin ${errorClassName} ${loadingClassName}`}
            onSubmit={ this.handleSubmit }
          >

            <input
              type="text"
              placeholder="Username"
              className="form-control"
              name="username"
              value={ username }
              onChange={ this.handleChange }
              ref={(input) => { this.usernameInput = input }} 
            />
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              name="password"
              value={ password }
              onChange={ this.handleChange }
            />
            <input
              type="submit"
              id="login_button"
              value="Login"
            />
            {error &&
              <div className="alert">
                <div className="error">{ msg }</div>
              </div>
            }
            {loading &&
              <div className="loading">
                <div className="spinner">
                  <BeatLoader size={ 20 } color={ '#131313' } />
                </div>
              </div>
            }
          </form>

        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { loading, error, msg } = state.auth
  return {
    loading,
    error,
    msg
  }
}

export default connect(mapStateToProps)(Login)
