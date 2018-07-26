
import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'react-tippy'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  textString: {
    color: theme.palette.common.white
  }
})

const Tip = ({ classes, children, content, ...otherProps }) => {

  let htmlContent = content

  if (typeof content === 'string' || content instanceof String)
    htmlContent = <Typography className={ classes.textString }>{ content }</Typography>

  return (
    <Tooltip
      html={ htmlContent }
      { ...otherProps }
    >{ children }</Tooltip>
  )
}

Tip.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired
}

Tip.defaultProps = {
  delay: 450,
  duration: 100,
  size: 'small'
}

export default withStyles(styles)(Tip)
