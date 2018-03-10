
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import Marquee from 'react-text-marquee'

import { utilsConstants } from '../../../../../_constants'

class ListItem extends Component {

  handleClick(album_id) {
    this.props.onItemClick(album_id)
  }

  render() {
    const { active, album_id, name, width, canDrop, isOver, connectDropTarget } = this.props
    const isDndActive = canDrop && isOver
    return connectDropTarget(
      <li
        className={`albums-item${active ? ' active' : ''} ${isDndActive ? 'dnd-dest-active' : ''}`}
        onClick={ () => this.handleClick(album_id) }
        style={{width: `${width}px`}}
      >
        <Marquee
          leading={ 500 }
          loop={ true }
          trailing={ 500 }
          text={ name }
          className="name"
        />
      </li>
    )
  }
}

ListItem.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  onItemClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  album_id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
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

export default DropTarget(utilsConstants.DND_MOVE_MEDIA, boxTarget, dndCollect)(ListItem)
