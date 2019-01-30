
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { withStyles } from '@material-ui/core/styles'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import IconButton from '@material-ui/core/IconButton'

import CloseIcon from '@material-ui/icons/Close'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning'

import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'

const typeIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
}

const styles = theme => ({
  snackRoot: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: `auto`,
    marginRight: `auto`
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconType: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  }
})

class StatusMessage extends Component {

  constructor() {
    super()

    this.state = {
      snackOpen: true
    }

    this.onClose = this.onClose.bind(this)
  }

  onClose() {
    this.setState({
      snackOpen: false
    })
  }

  render() {

    const { snackOpen } = this.state

    const { classes, className, message, type, closeIcon, ...other } = this.props

    const Icon = typeIcon[type]

    let content = <span />
    let closeSnackIcon = <span key="close" />

    if (closeIcon) {
      closeSnackIcon = <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        className={ classes.close }
        onClick={ this.onClose }
      >
        <CloseIcon className={ classes.icon } />
      </IconButton>
    }

    if (snackOpen) {
      content = <SnackbarContent
        className={ classNames(classes.snackRoot, classes[type], className) }
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={ classes.message }>
            <Icon className={ classNames(classes.icon, classes.iconType) } />
            { message }
          </span>
        }
        action={ [ closeSnackIcon ] }
        { ...other }
      />
    }

    return content
  }
}

StatusMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.oneOf(
    ['success', 'warning', 'error', 'info']
  ),
  closeIcon: PropTypes.bool
}

StatusMessage.defaultProps = {
  message: null,
  className: null,
  type: 'success',
  closeIcon: false
}

export default withStyles(styles)(StatusMessage)
