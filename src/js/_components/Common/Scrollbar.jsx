
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
    const { classes, children, position } = this.props

    const scrollbarOptions = {
      wheelSpeed: 1.25,
      suppressScrollX: true
    }

    return (
      <PerfectScrollbar
        option={ scrollbarOptions }
        className={ classes.scrollbar }
      >
        {children}
      </PerfectScrollbar>
    )
  }
}

Scrollbar.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  position: PropTypes.string
}

Scrollbar.defaultProps = {
  position: 'right'
}

export default withStyles(styles)(Scrollbar)

