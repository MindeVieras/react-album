import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { setTranslations } from 'redux-i18n'

import { Theme, createStyles } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

// import LoginForm from './LoginForm'

// import { loginTranslations } from '../../translations/loginTranslations'
// import { loginActions } from 'Actions'

interface LoginProps {
  classes: {
    root: string
    container: string
  }
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      // padding: `10% ${theme.spacing.unit}px`,
      overflow: `auto`,
      height: `100vh`,
    },
    container: {
      maxWidth: 360,
      // padding: theme.spacing.unit * 3,
      margin: `0 auto`,
    },
  })

/**
 * Login page component.
 *
 * @param {Props} props
 *   Component props.
 *
 * @returns {JSX.Element}
 *   Jsx html page.
 */
const Login = (props: LoginProps): JSX.Element => {
  // constructor(props) {
  // super(props)

  // reset login status
  // props.dispatch(loginActions.logout())
  // Set translations
  // props.dispatch(setTranslations(loginTranslations))
  // }

  // render() {
  // const { classes } = this.props

  return (
    <div className={props.classes.root}>
      <Paper className={props.classes.container}>{/* <LoginForm /> */}</Paper>
    </div>
  )
  // }
}

export default connect()(withStyles(styles)(Login))
