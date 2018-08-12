
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setTranslations } from 'redux-i18n'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import LoginForm from './LoginForm'

import { loginTranslations } from '../../translations/loginTranslations'
import { loginActions } from 'Actions'

const styles = theme => ({
  root: {
    padding: `10% ${theme.spacing.unit}px`,
    overflow: `auto`,
    height: `100vh`
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
