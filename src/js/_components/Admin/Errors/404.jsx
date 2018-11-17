
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import grey from '@material-ui/core/colors/grey'

import { headerActions, footerActions } from 'Actions'

const styles = theme => ({
  error_wrapper: {
    flex: 1,
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`
  },
  text: {
    color: grey[600]
  }
})

class Error404 extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(headerActions.setTitle('404 Not Found'))
    dispatch(footerActions.buttonsClear())
  }

  render() {

    const { classes } = this.props

    return (
      <div className={ classes.error_wrapper }>
        <Typography
          className={ classes.text }
          variant="h2"
        >
          Not found { location.pathname }
        </Typography>
      </div>
    )
  }
}

Error404.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

export default connect()(withStyles(styles)(Error404))
