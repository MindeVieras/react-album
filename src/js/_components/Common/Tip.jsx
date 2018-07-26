
import React from 'react'
import PropTypes from 'prop-types'

import ReactTooltip from 'react-tooltip'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  textString: {
    color: theme.palette.common.white
  },
  tooltip: {
    zIndex: theme.zIndex.tooltip + 1
  }
})

const Tip = ({ classes, children, ...otherProps }) => {

  let htmlContent = children

  if (typeof children === 'string' || children instanceof String)
    htmlContent = <Typography className={ classes.textString }>{ children }</Typography>

  return (
    <ReactTooltip
      className={ classes.tooltip }
      { ...otherProps }
    >{ htmlContent }</ReactTooltip>
  )
}

Tip.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
}

Tip.defaultProps = {
  delayShow: 750,
  effect: `solid`
}

export default withStyles(styles)(Tip)
