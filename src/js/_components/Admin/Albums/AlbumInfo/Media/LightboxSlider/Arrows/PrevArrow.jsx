
import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'

import grey from '@material-ui/core/colors/grey'

import ChevronLeft from '@material-ui/icons/ChevronLeft'

const styles = theme => ({
  button: {
    backgroundColor: grey[700],
    position: `fixed`,
    top: `50%`,
    left: 0,
    border: `none`,
    padding: 0,
    margin: 0,
    height: 80,
    '&:hover, &$focusVisible': {
      backgroundColor: grey[800]
    }
  },
  focusVisible: {},
  buttonIcon: {
    fontSize: 40,
    color: theme.palette.common.white
  }
})

const PrevArrow = ({ classes, onClick, currentSlide }) => {
  if (currentSlide != 0) {
    return (
      <ButtonBase
        focusRipple
        className={ classes.button }
        focusVisibleClassName={ classes.focusVisible }
        onClick={ onClick }
      >
        <ChevronLeft className={ classes.buttonIcon } />
      </ButtonBase>
    )
  }
  else {
    return <span/>
  }
}

PrevArrow.propTypes = {
  classes: PropTypes.object.isRequired,
  currentSlide: PropTypes.number.isRequired,
  onClick: PropTypes.func
}

PrevArrow.defaultProps = {
  onClick: () => { return }
}

export default withStyles(styles)(PrevArrow)
