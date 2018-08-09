
import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import PerfectScrollbar from 'react-perfect-scrollbar'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  scrollbar: {
    display: `flex`,
    overflow: `hidden`
  }
})

class Scrollbar extends Component {

  render() {
    const { classes, children, className, position } = this.props

    const scrollbarOptions = {
      wheelSpeed: 1.25,
      suppressScrollX: true
    }

    return (
      <PerfectScrollbar
        option={ scrollbarOptions }
        className={ `${classes.scrollbar} ${className}` }
      >
        {children}
      </PerfectScrollbar>
    )
  }
}

Scrollbar.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  position: PropTypes.string
}

Scrollbar.defaultProps = {
  className: '',
  position: 'right'
}

export default withStyles(styles)(Scrollbar)

