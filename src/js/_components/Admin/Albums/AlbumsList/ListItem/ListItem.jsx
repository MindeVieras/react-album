
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import moment from 'moment'

import { withStyles } from '@material-ui/core/styles'
import MuiListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'

import blueGrey from '@material-ui/core/colors/blueGrey'

import { Tip } from 'Common'

import { utilsConstants } from 'Constants'

const styles = theme => ({
  item: {
    // color: blueGrey[50],
    color: theme.palette.common.white,
    paddingLeft: theme.spacing.unit * 1.5,
    paddingRight: theme.spacing.unit * 1.5
  },
  active: {
    backgroundColor: blueGrey[800]
  },
  dndActive: {
    backgroundColor: blueGrey[700]
  }
})

class ListItem extends Component {

  handleClick(active, album_id) {
    if (!active) {
      this.props.onItemClick(album_id)
    }
  }

  render() {
    const {
      classes,
      active,
      album_id,
      name,
      start_date,
      canDrop,
      isOver,
      connectDropTarget } = this.props
    const isDndActive = canDrop && isOver

    let activeClass = active ? classes.active : ``
    let dndClass = isDndActive ? classes.dndActive : ``

    return connectDropTarget(
      <li
        className={ `${activeClass} ${dndClass}` }
        onClick={ () => this.handleClick(active, album_id) }
      >
        <MuiListItem
          data-tip
          data-for={ `tip_album_list_item_${album_id}` }
          button
          className={ classes.item }
        >
          <Typography
            variant="body2"
            color="inherit"
          >
            { name }
          </Typography>
        </MuiListItem>
        <Tip
          id={ `tip_album_list_item_${album_id}` }
          effect="float"
        >{ moment(start_date).format('YYYY-MM-DD') }</Tip>
      </li>
    )
  }
}

ListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  onItemClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  album_id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  start_date: PropTypes.string.isRequired
}

const boxTarget = {
  drop(props) {
    return { album_id: props.album_id }
  },
  canDrop(props, monitor) {
    if (props.active)
      return false
    else
      return true
  }
}

function dndCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}

export default DropTarget(
  utilsConstants.DND_MOVE_MEDIA,
  boxTarget,
  dndCollect
)(withStyles(styles)(ListItem))
