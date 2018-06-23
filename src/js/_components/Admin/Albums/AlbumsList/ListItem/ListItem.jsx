
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import uuidv4 from 'uuid/v4'
import ReactTooltip from 'react-tooltip'
import Marquee from 'react-text-marquee'
import moment from 'moment'

import { withStyles } from '@material-ui/core/styles'
import MuiListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'

import { utilsConstants } from '../../../../../_constants'

const styles = theme => ({
  item: {
    color: theme.palette.text.primary
  }
})

class ListItem extends Component {

  handleClick(active, album_id) {
    if (!active) {
      this.props.onItemClick(album_id)
    }
  }

  render() {
    const tooltipId = uuidv4()
    const {
      classes,
      active,
      album_id,
      name,
      width,
      start_date,
      canDrop,
      isOver,
      connectDropTarget } = this.props
    const isDndActive = canDrop && isOver
    return connectDropTarget(
      <li
        className={`${active ? 'active' : ''} ${isDndActive ? ' dnd-dest-active' : ''}` }
        onClick={ () => this.handleClick(active, album_id) }
        style={{width: `${width}px`}}
        data-tip
        data-for={ tooltipId }
      >
        <MuiListItem
          button
          className={ classes.item }
        >

          <Typography
            variant="body1"
            color="inherit"
          >
            <Marquee
              leading={ 500 }
              loop={ true }
              trailing={ 500 }
              text={ name }
              className="name"
            />
          </Typography>
          <ReactTooltip
            id={ tooltipId }
            delayShow={ 400 }
          >
            { moment(start_date).format('YYYY-MM-DD') }
          </ReactTooltip>
        </MuiListItem>
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
  start_date: PropTypes.string.isRequired,
  width: PropTypes.number
}

ListItem.defaultProps = {
  width: 200
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

export default DropTarget(utilsConstants.DND_MOVE_MEDIA, boxTarget, dndCollect)(withStyles(styles)(ListItem))
