
import React, {Component} from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  wrapper: {
    backgroundColor: `rgba(111,111,111, 0.5)`,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    cursor: 'progress',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinner: {
    color: green[300]
  }
})

const CircleSpinner = ({ classes, size }) => (
  <div className={ classes.wrapper }>
    <CircularProgress
      size={ size }
      className={ classes.spinner }
    />
  </div>
)

CircleSpinner.propTypes = {
  classes: PropTypes.object.isRequired,
  size: PropTypes.number
}

CircleSpinner.defaultProps = {
  size: 26
}

export default withStyles(styles)(CircleSpinner)
