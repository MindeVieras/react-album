
import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'

import { RingLoader, ScaleLoader, ClipLoader } from 'react-spinners'

const styles = theme => ({
  spinnerWrapper: {
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
    position: `absolute`,
    top: 0,
    left: 0,
    width: `100%`,
    height: `100%`
  },
  listSpinnerWrapper: {
    backgroundColor: `rgba(0,0,0,0.5)`,
    cursor: `progress`
  }
})

const Spinner = ({ classes, type, size }) => {

  let spinnerClass = classes.spinnerWrapper
  let spinner = <span/>

  if (type === 'primary') {
    spinner =
      <RingLoader
        color={'#f6f6f5'}
        size={size}
      />
  }
  else if (type === 'list-item') {
    spinnerClass = `${classes.spinnerWrapper} ${classes.listSpinnerWrapper}`
    spinner =
      <ScaleLoader
        color={'#f6f6f5'}
        height={size}
      />
  }
  else if (type === 'thumbnail') {
    spinner =
      <ClipLoader
        color={'#f6f6f5'}
        size={size}
      />
  }

  return (
    <div className={ spinnerClass }>
      { spinner }
    </div>
  )

}

Spinner.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string,
  size: PropTypes.number
}

Spinner.defaultProps = {
  type: 'primary',
  size: 70
}
export default withStyles(styles)(Spinner)
