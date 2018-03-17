
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setTranslations } from 'redux-i18n'
import { BeatLoader } from 'react-spinners'

import { loginTranslations } from '../../translations/loginTranslations'

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
    const { dispatch } = this.props

    // Set translations
    dispatch(setTranslations(loginTranslations))

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
    const { t } = this.context
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
              placeholder={ t('Username') }
              className="form-control"
              name="username"
              value={ username }
              onChange={ this.handleChange }
              ref={(input) => { this.usernameInput = input }} 
            />
            <input
              type="password"
              placeholder={ t('Password') }
              className="form-control"
              name="password"
              value={ password }
              onChange={ this.handleChange }
            />
            <input
              type="submit"
              id="login_button"
              value={ t('Login') }
            />
            {error &&
              <div className="alert">
                <div className="error">{ t(msg) }</div>
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

Login.contextTypes = {
  t: PropTypes.func
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
