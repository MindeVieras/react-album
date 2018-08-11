
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import CircleSpinner from '../Spinners/CircleSpinner'

const styles = theme => ({
  btn_wrapper: {
    position: 'relative'
  }
})

const RenderButton = ({ classes, className, type, loading, text, ...otherProps }) => (
  <div className={ `${classes.btn_wrapper} ${className}` }>
    <Button
      type={ type }
      size="large"
      { ...otherProps }
    >
      { text }
    </Button>

    {loading &&
      <CircleSpinner size={ 32 } />
    }
  </div>
)

RenderButton.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  loading: PropTypes.bool,
  text: PropTypes.string
}

RenderButton.defaultProps = {
  className: '',
  type: 'button',
  loading: false,
  text: 'Submit',
  fullWidth: false
}

export default withStyles(styles)(RenderButton)
