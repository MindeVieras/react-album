
import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'

import grey from '@material-ui/core/colors/grey'

import ChevronRight from '@material-ui/icons/ChevronRight'

const styles = theme => ({
  button: {
    backgroundColor: grey[700],
    position: `fixed`,
    top: `50%`,
    right: 0,
    border: `none`,
    padding: 0,
    margin: 0,
    height: 80,
    '&:hover, &$focusVisible': {
      backgroundColor: grey[800],
    }
  },
  focusVisible: {},
  buttonIcon: {
    fontSize: 40,
    color: theme.palette.common.white
  }
})

const NextArrow = ({ classes, onClick, currentSlide, slideCount }) => {
  if (currentSlide < slideCount - 1) {
    return (
      <ButtonBase
        focusRipple
        className={ classes.button }
        focusVisibleClassName={ classes.focusVisible }
        onClick={ onClick }
      >
        <ChevronRight className={ classes.buttonIcon } />
      </ButtonBase>
    )
  }
  else {
    return <span/>
  }
}

NextArrow.propTypes = {
  classes: PropTypes.object.isRequired,
  currentSlide: PropTypes.number.isRequired,
  slideCount: PropTypes.number.isRequired,
  onClick: PropTypes.func
}

NextArrow.defaultProps = {
  onClick: () => { return }
}

export default withStyles(styles)(NextArrow)
