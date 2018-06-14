
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setTranslations } from 'redux-i18n'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import green from '@material-ui/core/colors/green'

import { loginTranslations } from '../../translations/loginTranslations'
import { loginActions } from '../../_actions'
import LoginForm from './LoginForm'

// import '../../../scss/Login/main.scss'

const styles = theme => ({
  root: {
    backgroundColor: green[400],
    position: `absolute`,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: `10% 10px`,
    overflow: `auto`
  },
  container: {
    maxWidth: 360,
    padding: theme.spacing.unit * 3,
    margin: `0 auto`
  }
})

class Login extends Component {

  constructor(props) {
    super(props)

    // reset login status
    props.dispatch(loginActions.logout())
    // Set translations
    props.dispatch(setTranslations(loginTranslations))
  }

  render() {
    const { classes } = this.props

    return (
      <div className={ classes.root }>
        <Paper className={ classes.container }>
          <LoginForm />
        </Paper>
      </div>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect()(withStyles(styles)(Login))
