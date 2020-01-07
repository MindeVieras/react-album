import React from 'react'
import PropTypes from 'prop-types'

import { withStyles, Theme, createStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import CircleSpinner from '../Spinners/CircleSpinner'

const styles = (theme: Theme) =>
  createStyles({
    btn_wrapper: {
      position: 'relative',
    },
  })

const RenderButton = ({ classes, className, type, loading, text, ...otherProps }: any) => (
  <div className={`${classes.btn_wrapper} ${className}`}>
    <Button type={type} size="large" {...otherProps}>
      {text}
    </Button>

    {loading && <CircleSpinner size={32} />}
  </div>
)

RenderButton.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  loading: PropTypes.bool,
  text: PropTypes.string,
}

RenderButton.defaultProps = {
  className: '',
  type: 'button',
  loading: false,
  text: 'Submit',
  fullWidth: false,
}

export const ButtonInput = withStyles(styles)(RenderButton)
