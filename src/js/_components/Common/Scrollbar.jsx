
import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import classNames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'

import { withStyles } from '@material-ui/core/styles'

import blueGrey from '@material-ui/core/colors/blueGrey'

const styles = theme => ({
  scrollbar: {
    '& .ps__rail-y': {
      width: theme.spacing.unit * 1.5,
      '&:hover': {
        backgroundColor: blueGrey[800],
        '& .ps__thumb-y': {
          width: theme.spacing.unit
        }
      }
    }
  },
  scrollbarLeft: {
    '& .ps__rail-y': {
      left: 0
    },
    '& .ps__thumb-y': {
      left: theme.spacing.unit / 4
    }
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
        className={classNames(
          className,
          classes.scrollbar,
          { [classes.scrollbarLeft]: position === 'left' }
        )}
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

